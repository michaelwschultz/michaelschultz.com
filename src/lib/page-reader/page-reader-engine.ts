import type { KokoroTTS } from 'kokoro-js';

import {
	ensureAudioContextRunning,
	getSharedAudioContext,
	isMobileReader,
	unlockReaderAudio,
	yieldToMain
} from './audio-context';
import { loadKokoro, splitSentences } from './kokoro-loader';
import type { ReaderVoice } from './voice-catalog';
import { DEFAULT_READER_VOICE } from './voice-catalog';

const STATE_TICK_MS = 200;
const MIN_RATE = 0.5;
const MAX_RATE = 2;
const BASE_SEC_PER_CHAR = 0.07;
const ESTIMATE_PRIOR_CHARS = 400;
const DURATION_UPDATE_THRESHOLD = 2;
/** Sentences to synthesize ahead of playback on mobile (limits memory and main-thread blocking). */
const MOBILE_GENERATION_LOOKAHEAD = 1;

let lastRate = 1;

export type ReaderStatus =
	| 'idle'
	| 'loading-model'
	| 'generating'
	| 'playing'
	| 'paused'
	| 'error';

export interface ReaderState {
	status: ReaderStatus;
	currentTime: number;
	duration: number;
	modelProgress: number;
	generationProgress: number;
	rate: number;
	error: string | null;
}

const INITIAL_STATE: ReaderState = {
	status: 'idle',
	currentTime: 0,
	duration: 0,
	modelProgress: 0,
	generationProgress: 0,
	rate: 1,
	error: null
};

function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}

export class PageReaderEngine {
	private ctx: AudioContext | null = null;
	private listeners = new Set<(state: ReaderState) => void>();
	private rate = lastRate;
	private state: ReaderState = { ...INITIAL_STATE, rate: lastRate };
	private runId = 0;
	private tts: KokoroTTS | null = null;
	private voice: ReaderVoice = DEFAULT_READER_VOICE;
	private sentences: Array<string> = [];
	private charLen: Array<number> = [];
	private chunks: Array<AudioBuffer | null> = [];
	private chunkDurations: Array<number> = [];
	private chunkStart: Array<number> = [];
	private baseSentence = 0;
	private totalGenerated = 0;
	private generationComplete = false;
	private totalChars = 1;
	private producedChars = 0;
	private displayedDuration = 0;
	private timelineVersion = 0;
	private cachedStarts: Array<number> | null = null;
	private cachedStartsVersion = -1;
	private source: AudioBufferSourceNode | null = null;
	private currentChunkIndex = 0;
	private offsetInBuffer = 0;
	private chunkPlayCtxStart = 0;
	private isPlaying = false;
	private waitingForChunk = false;
	private pausedAt = 0;
	private ticker: ReturnType<typeof setInterval> | null = null;
	private generationPump: Promise<void> | null = null;

	subscribe(listener: (state: ReaderState) => void): () => void {
		this.listeners.add(listener);
		listener(this.state);
		return () => {
			this.listeners.delete(listener);
		};
	}

	getState(): ReaderState {
		return this.state;
	}

	getSentences(): Array<string> {
		return this.sentences;
	}

	getProgress(): { index: number; fraction: number } | null {
		if (this.chunks.length === 0) return null;
		const rel = clamp(this.currentTime() - this.baseOffset(), 0, this.totalGenerated);
		const chunkIndex = Math.min(this.indexForRel(rel), this.chunks.length - 1);
		const start = this.chunkStart[chunkIndex] ?? 0;
		const duration = this.chunkDuration(chunkIndex);
		const fraction = duration > 0 ? clamp((rel - start) / duration, 0, 1) : 0;
		return { index: this.baseSentence + chunkIndex, fraction };
	}

	private setState(patch: Partial<ReaderState>): void {
		this.state = { ...this.state, ...patch };
		for (const listener of this.listeners) listener(this.state);
	}

	private ensureContext(): AudioContext | null {
		if (this.ctx) return this.ctx;

		const shared = getSharedAudioContext();
		if (shared) {
			this.ctx = shared;
			return shared;
		}

		const unlocked = unlockReaderAudio();
		if (unlocked) {
			this.ctx = unlocked;
			return unlocked;
		}

		const Ctor =
			globalThis.AudioContext ??
			(globalThis as unknown as { webkitAudioContext?: typeof AudioContext })
				.webkitAudioContext;
		if (Ctor === undefined) return null;
		this.ctx = new Ctor();
		return this.ctx;
	}

	private chunkDuration(index: number): number {
		const buffer = this.chunks[index];
		if (buffer) return buffer.duration;
		return this.chunkDurations[index] ?? 0;
	}

	private trimPlayedChunks(): void {
		if (!isMobileReader()) return;
		const trimBefore = this.currentChunkIndex - 1;
		if (trimBefore <= 0) return;
		for (let i = 0; i < trimBefore; i++) {
			const buffer = this.chunks[i];
			if (!buffer) continue;
			this.chunkDurations[i] = buffer.duration;
			this.chunks[i] = null;
		}
	}

	private bumpTimeline(): void {
		this.timelineVersion += 1;
		this.cachedStarts = null;
	}

	private bufferedChars(): number {
		let total = 0;
		for (let i = 0; i < this.chunks.length; i++) {
			total += this.charLen[this.baseSentence + i] ?? 0;
		}
		return total;
	}

	private secPerChar(): number {
		const prior = BASE_SEC_PER_CHAR / this.rate;
		const chars = this.bufferedChars();
		if (chars === 0) return prior;
		return (this.totalGenerated + ESTIMATE_PRIOR_CHARS * prior) / (chars + ESTIMATE_PRIOR_CHARS);
	}

	private projectedStarts(): Array<number> {
		if (this.cachedStarts && this.cachedStartsVersion === this.timelineVersion) {
			return this.cachedStarts;
		}
		const n = this.sentences.length;
		const spc = this.secPerChar();
		const starts = Array.from<number>({ length: n + 1 });
		starts[0] = 0;
		for (let i = 0; i < n; i++) {
			const rel = i - this.baseSentence;
			const duration =
				rel >= 0 && rel < this.chunks.length
					? this.chunkDuration(rel)
					: (this.charLen[i] ?? 0) * spc;
			starts[i + 1] = starts[i] + duration;
		}
		this.cachedStarts = starts;
		this.cachedStartsVersion = this.timelineVersion;
		return starts;
	}

	private baseOffset(): number {
		if (this.baseSentence === 0) return 0;
		return this.projectedStarts()[this.baseSentence];
	}

	private projectedTotal(): number {
		return this.projectedStarts().at(-1) ?? 0;
	}

	private sentenceForTime(time: number, starts: Array<number>): number {
		for (let i = 0; i < this.sentences.length; i++) {
			if (time < starts[i + 1]) return i;
		}
		return Math.max(this.sentences.length - 1, 0);
	}

	private updateDuration(force: boolean): void {
		const next = this.projectedTotal();
		if (force || Math.abs(next - this.displayedDuration) >= DURATION_UPDATE_THRESHOLD) {
			this.displayedDuration = next;
			this.setState({ duration: next });
		}
	}

	private currentTime(): number {
		const baseOff = this.baseOffset();
		if (!this.isPlaying) return this.pausedAt;
		if (this.ctx && this.source) {
			const rel =
				this.chunkStart[this.currentChunkIndex] +
				this.offsetInBuffer +
				(this.ctx.currentTime - this.chunkPlayCtxStart);
			return baseOff + clamp(rel, 0, this.totalGenerated);
		}
		return baseOff + this.totalGenerated;
	}

	private startTicker(): void {
		this.stopTicker();
		this.ticker = globalThis.setInterval(() => {
			this.setState({ currentTime: this.currentTime() });
		}, STATE_TICK_MS);
	}

	private stopTicker(): void {
		if (this.ticker !== null) {
			globalThis.clearInterval(this.ticker);
			this.ticker = null;
		}
	}

	private stopSource(): void {
		if (this.source) {
			const source = this.source;
			this.source = null;
			try {
				source.stop();
			} catch {
				// already stopped
			}
			source.disconnect();
		}
	}

	private indexForRel(rel: number): number {
		if (this.chunks.length === 0) return 0;
		if (rel >= this.totalGenerated) return this.chunks.length;
		for (const [index] of this.chunks.entries()) {
			if (rel < this.chunkStart[index] + this.chunkDuration(index)) return index;
		}
		return this.chunks.length - 1;
	}

	private handleSourceEnded(source: AudioBufferSourceNode): void {
		if (source !== this.source) return;
		this.source = null;
		void this.playChunkAt(this.currentChunkIndex + 1, 0);
	}

	private async playChunkAt(index: number, offset: number): Promise<void> {
		this.stopSource();
		const ctx = this.ctx;

		if (index >= this.chunks.length || !ctx) {
			this.currentChunkIndex = index;
			if (this.generationComplete || !ctx) {
				this.isPlaying = false;
				this.waitingForChunk = false;
				this.pausedAt = this.baseOffset() + this.totalGenerated;
				this.stopTicker();
				this.setState({ status: 'paused', currentTime: this.pausedAt });
			} else {
				this.waitingForChunk = true;
				this.isPlaying = true;
				this.setState({
					status: this.chunks.length === 0 ? 'generating' : 'playing'
				});
				this.requestMoreGeneration();
			}
			return;
		}

		const buffer = this.chunks[index];
		if (!buffer) {
			this.setState({
				status: 'error',
				error: 'Audio was cleared. Tap Listen to start again.'
			});
			this.isPlaying = false;
			return;
		}

		if (!(await ensureAudioContextRunning(ctx))) {
			this.isPlaying = false;
			this.waitingForChunk = false;
			this.stopTicker();
			this.setState({
				status: 'error',
				error: 'Audio was blocked. Tap Listen to try again.'
			});
			return;
		}

		const source = ctx.createBufferSource();
		source.buffer = buffer;
		source.connect(ctx.destination);
		source.addEventListener('ended', () => {
			this.handleSourceEnded(source);
		});

		this.currentChunkIndex = index;
		this.offsetInBuffer = offset;
		this.chunkPlayCtxStart = ctx.currentTime;
		this.waitingForChunk = false;
		this.isPlaying = true;
		source.start(0, offset);
		this.source = source;
		this.trimPlayedChunks();

		this.startTicker();
		this.setState({ status: 'playing', currentTime: this.currentTime() });
		this.requestMoreGeneration();
	}

	private playFromRel(rel: number): void {
		const target = clamp(rel, 0, this.totalGenerated);
		const index = this.indexForRel(target);
		const offset = index < this.chunks.length ? target - this.chunkStart[index] : 0;
		this.isPlaying = true;
		void this.playChunkAt(index, offset);
	}

	private appendChunk(buffer: AudioBuffer): void {
		const index = this.chunks.length;
		this.chunks.push(buffer);
		this.chunkDurations.push(buffer.duration);
		this.chunkStart[index] = this.totalGenerated;
		this.totalGenerated += buffer.duration;
		this.bumpTimeline();
		this.updateDuration(false);

		if (this.isPlaying && this.waitingForChunk && this.currentChunkIndex === index) {
			void this.playChunkAt(index, 0);
		}

		this.requestMoreGeneration();
	}

	private resetPlayback(): void {
		this.stopSource();
		this.stopTicker();
		this.sentences = [];
		this.charLen = [];
		this.chunks = [];
		this.chunkDurations = [];
		this.chunkStart = [];
		this.baseSentence = 0;
		this.totalGenerated = 0;
		this.generationComplete = false;
		this.currentChunkIndex = 0;
		this.offsetInBuffer = 0;
		this.chunkPlayCtxStart = 0;
		this.isPlaying = false;
		this.waitingForChunk = false;
		this.pausedAt = 0;
		this.totalChars = 1;
		this.producedChars = 0;
		this.displayedDuration = 0;
		this.bumpTimeline();
	}

	private sumChars(count: number): number {
		let total = 0;
		for (let i = 0; i < count; i++) total += this.charLen[i] ?? 0;
		return total;
	}

	private truncateFrom(relIndex: number): void {
		this.chunks.length = relIndex;
		this.chunkDurations.length = relIndex;
		this.chunkStart.length = relIndex;
		this.totalGenerated =
			relIndex > 0
				? this.chunkStart[relIndex - 1] + this.chunkDuration(relIndex - 1)
				: 0;
		this.generationComplete = false;
		this.bumpTimeline();
		this.displayedDuration = 0;
	}

	async prepare(text: string, voice: ReaderVoice | Promise<ReaderVoice>): Promise<boolean> {
		const runId = ++this.runId;
		this.resetPlayback();

		const ctx = this.ensureContext();
		if (!ctx) {
			this.setState({
				status: 'error',
				error: 'Audio isn’t supported in this browser.'
			});
			return false;
		}

		if (!(await ensureAudioContextRunning(ctx))) {
			this.setState({
				status: 'error',
				error: 'Audio was blocked. Tap Listen to try again.'
			});
			return false;
		}

		this.setState({
			status: 'loading-model',
			currentTime: 0,
			duration: 0,
			modelProgress: 0,
			generationProgress: 0,
			error: null
		});

		try {
			this.tts = await loadKokoro((loaded, total) => {
				if (runId === this.runId) {
					this.setState({ modelProgress: total > 0 ? loaded / total : 0 });
				}
			});
		} catch {
			if (runId === this.runId) {
				this.setState({
					status: 'error',
					error: 'Couldn’t load the reader voice.'
				});
			}
			return false;
		}
		if (runId !== this.runId) return false;

		try {
			this.voice = await voice;
		} catch {
			this.voice = DEFAULT_READER_VOICE;
		}
		if (runId !== this.runId) return false;

		try {
			this.sentences = await splitSentences(text);
		} catch {
			this.sentences = [text];
		}
		if (runId !== this.runId) return false;
		if (this.sentences.length === 0) {
			this.setState({ status: 'error', error: 'There’s nothing to read.' });
			return false;
		}

		this.charLen = this.sentences.map((sentence) => sentence.length);
		this.totalChars = Math.max(this.sumChars(this.sentences.length), 1);
		this.bumpTimeline();
		this.setState({ status: 'generating', generationProgress: 0 });

		this.baseSentence = 0;
		this.isPlaying = true;
		this.waitingForChunk = true;
		this.currentChunkIndex = 0;
		this.pausedAt = 0;

		void this.scheduleGeneration();
		await this.waitForBufferedChunk(runId);
		return runId === this.runId;
	}

	private async waitForBufferedChunk(runId: number): Promise<void> {
		while (runId === this.runId && this.chunks.length === 0 && this.state.status !== 'error') {
			await yieldToMain();
		}
	}

	private lastBufferedSentenceIndex(): number {
		if (this.chunks.length === 0) return this.baseSentence - 1;
		return this.baseSentence + this.chunks.length - 1;
	}

	private playbackSentenceIndex(): number {
		if (this.chunks.length === 0) return this.baseSentence;
		return this.baseSentence + Math.min(this.currentChunkIndex, this.chunks.length - 1);
	}

	private needsMoreGeneration(): boolean {
		if (this.generationComplete) return false;
		const nextIndex = this.baseSentence + this.chunks.length;
		if (nextIndex >= this.sentences.length) return false;
		if (!isMobileReader()) return true;
		return (
			this.lastBufferedSentenceIndex() - this.playbackSentenceIndex() <
			MOBILE_GENERATION_LOOKAHEAD
		);
	}

	private requestMoreGeneration(): void {
		if (!this.needsMoreGeneration()) return;
		this.scheduleGeneration();
	}

	private scheduleGeneration(): void {
		if (this.generationPump) return;
		this.generationPump = this.pumpGeneration().finally(() => {
			this.generationPump = null;
			if (this.needsMoreGeneration()) {
				this.scheduleGeneration();
			}
		});
	}

	private async generateSentenceAt(index: number, runId: number): Promise<boolean> {
		const ctx = this.ctx;
		const tts = this.tts;
		if (!ctx || !tts) return false;

		let raw;
		try {
			raw = await tts.generate(this.sentences[index], {
				voice: this.voice,
				speed: this.rate
			});
		} catch {
			if (runId === this.runId) {
				this.setState({ status: 'error', error: 'Couldn’t generate audio.' });
			}
			return false;
		}
		if (runId !== this.runId) return false;

		const audio = Array.isArray(raw.audio) ? raw.audio[0] : raw.audio;
		if (audio) {
			const buffer = ctx.createBuffer(1, audio.length, raw.sampling_rate);
			buffer.getChannelData(0).set(audio);
			this.producedChars += this.charLen[index] ?? 0;
			this.appendChunk(buffer);
		}
		this.setState({
			generationProgress: Math.min(this.producedChars / this.totalChars, 0.99)
		});
		return true;
	}

	private async pumpGeneration(): Promise<void> {
		const runId = this.runId;
		const ctx = this.ctx;
		const tts = this.tts;
		if (!ctx || !tts) return;

		this.producedChars = this.sumChars(this.baseSentence + this.chunks.length);

		while (runId === this.runId && this.needsMoreGeneration()) {
			const index = this.baseSentence + this.chunks.length;
			const ok = await this.generateSentenceAt(index, runId);
			if (!ok) return;
			await yieldToMain();
		}

		if (runId !== this.runId) return;

		if (this.baseSentence + this.chunks.length >= this.sentences.length) {
			this.generationComplete = true;
			this.updateDuration(true);
			this.setState({ generationProgress: 1 });
		}
	}

	play(): void {
		if (this.isPlaying) return;
		unlockReaderAudio();
		void this.resumePlayback();
	}

	private async resumePlayback(): Promise<void> {
		const ctx = this.ctx;
		if (!ctx || !(await ensureAudioContextRunning(ctx))) {
			this.setState({
				status: 'error',
				error: 'Audio was blocked. Tap Listen to try again.'
			});
			return;
		}
		this.isPlaying = true;
		this.resumeAt(this.pausedAt);
	}

	pause(): void {
		if (!this.isPlaying) return;
		this.pausedAt = this.currentTime();
		this.stopSource();
		this.isPlaying = false;
		this.waitingForChunk = false;
		this.stopTicker();
		this.setState({ status: 'paused', currentTime: this.pausedAt });
	}

	toggle(): void {
		if (this.isPlaying) this.pause();
		else this.play();
	}

	private resumeAt(projectedTime: number): void {
		const starts = this.projectedStarts();
		const target = clamp(projectedTime, 0, starts.at(-1) ?? 0);
		const sentence = this.sentenceForTime(target, starts);
		const inBuffer =
			sentence >= this.baseSentence && sentence < this.baseSentence + this.chunks.length;

		if (inBuffer) {
			this.playFromRel(target - this.baseOffset());
			return;
		}
		this.rebaseTo(sentence, target);
	}

	private rebaseTo(sentenceIndex: number, displayTime: number): void {
		const wasPlaying = this.isPlaying;
		this.runId += 1;
		this.stopSource();

		this.baseSentence = clamp(sentenceIndex, 0, this.sentences.length - 1);
		this.chunks = [];
		this.chunkDurations = [];
		this.chunkStart = [];
		this.totalGenerated = 0;
		this.generationComplete = false;
		this.currentChunkIndex = 0;
		this.offsetInBuffer = 0;
		this.pausedAt = displayTime;
		this.isPlaying = wasPlaying;
		this.waitingForChunk = wasPlaying;
		this.displayedDuration = 0;
		this.bumpTimeline();

		if (!wasPlaying) this.stopTicker();
		this.setState({
			status: wasPlaying ? 'playing' : 'paused',
			currentTime: displayTime,
			generationProgress: Math.min(this.sumChars(this.baseSentence) / this.totalChars, 0.99)
		});

		void this.scheduleGeneration();
	}

	private seek(projectedTime: number): void {
		if (this.sentences.length === 0) return;
		if (this.isPlaying) {
			this.resumeAt(projectedTime);
			return;
		}
		const target = clamp(projectedTime, 0, this.projectedTotal());
		this.pausedAt = target;
		this.setState({ currentTime: target });
	}

	skip(seconds: number): void {
		this.seek(this.currentTime() + seconds);
	}

	seekTo(seconds: number): void {
		this.seek(seconds);
	}

	setRate(rate: number): void {
		const next = clamp(rate, MIN_RATE, MAX_RATE);
		if (next === this.rate) return;
		this.rate = next;
		lastRate = next;
		this.setState({ rate: next });

		if (!this.tts || this.sentences.length === 0) {
			this.bumpTimeline();
			return;
		}

		const wasPlaying = this.isPlaying;
		const resumeRel = Math.min(this.currentChunkIndex, this.chunks.length);

		this.runId += 1;
		this.stopSource();
		this.truncateFrom(resumeRel);

		this.currentChunkIndex = resumeRel;
		this.offsetInBuffer = 0;
		this.pausedAt = this.baseOffset() + this.totalGenerated;
		this.isPlaying = wasPlaying;
		this.waitingForChunk = wasPlaying;
		if (!wasPlaying) {
			this.stopTicker();
			this.setState({ currentTime: this.pausedAt });
		}

		void this.scheduleGeneration();
	}

	reset(): void {
		this.runId += 1;
		this.resetPlayback();
		this.setState({ ...INITIAL_STATE, rate: this.rate });
	}

	dispose(): void {
		this.runId += 1;
		this.resetPlayback();
		void this.ctx?.close();
		this.ctx = null;
		this.listeners.clear();
	}
}
