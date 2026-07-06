import { browser } from '$app/environment';
import type { PageReaderEngine, ReaderState } from './page-reader-engine';
import { extractSpeechText } from './speech-text';
import { DEFAULT_READER_VOICE } from './voice-catalog';

export type NowPlaying = {
	slug: string;
	title: string;
};

const INITIAL_STATE: ReaderState = {
	status: 'idle',
	currentTime: 0,
	duration: 0,
	modelProgress: 0,
	generationProgress: 0,
	rate: 1,
	error: null
};

let engine: PageReaderEngine | null = $state(null);
let enginePromise: Promise<PageReaderEngine | null> | null = null;
export const pageReader = $state({
	state: { ...INITIAL_STATE },
	nowPlaying: null as NowPlaying | null,
	scrollLocked: true
});
let preparedRef: { slug: string; text: string } | null = $state(null);
let lastPlayback: { slug: string; title: string; text: string; root: HTMLElement } | null =
	$state(null);
let unsubscribe: (() => void) | null = null;

function attachEngine(instance: PageReaderEngine): PageReaderEngine {
	unsubscribe?.();
	unsubscribe = instance.subscribe((next) => {
		pageReader.state.status = next.status;
		pageReader.state.currentTime = next.currentTime;
		pageReader.state.duration = next.duration;
		pageReader.state.modelProgress = next.modelProgress;
		pageReader.state.generationProgress = next.generationProgress;
		pageReader.state.rate = next.rate;
		pageReader.state.error = next.error;
	});
	engine = instance;
	return instance;
}

/** Load Kokoro and the reader engine on demand (kept out of the site-wide client graph). */
export async function ensurePageReaderEngine(): Promise<PageReaderEngine | null> {
	if (!browser) return null;
	if (engine) return engine;

	enginePromise ??= import('./page-reader-engine').then(({ PageReaderEngine }) =>
		attachEngine(new PageReaderEngine())
	);

	try {
		return await enginePromise;
	} catch {
		enginePromise = null;
		return null;
	}
}

export function initPageReader(): void {
	void ensurePageReaderEngine();
}

export function disposePageReader(): void {
	unsubscribe?.();
	unsubscribe = null;
	engine?.dispose();
	engine = null;
	enginePromise = null;
	Object.assign(pageReader.state, INITIAL_STATE);
	pageReader.nowPlaying = null;
	preparedRef = null;
	lastPlayback = null;
}

export function isReaderActive(): boolean {
	return pageReader.state.status !== 'idle';
}

export function isCurrentThought(slug: string): boolean {
	return pageReader.nowPlaying?.slug === slug;
}

export async function playThought(
	slug: string,
	title: string,
	root: HTMLElement
): Promise<void> {
	const activeEngine = await ensurePageReaderEngine();
	if (!activeEngine) return;

	const text = extractSpeechText(root);
	if (!text) return;

	lastPlayback = { slug, title, text, root };
	pageReader.nowPlaying = { slug, title };
	pageReader.scrollLocked = true;

	const { status } = activeEngine.getState();
	const prepared = preparedRef;
	const alreadyPrepared =
		prepared?.slug === slug &&
		prepared.text === text &&
		status !== 'idle' &&
		status !== 'error';

	if (alreadyPrepared) {
		activeEngine.play();
		return;
	}

	preparedRef = { slug, text };
	const ok = await activeEngine.prepare(text, DEFAULT_READER_VOICE);
	if (!ok && preparedRef?.slug === slug) {
		preparedRef = null;
	}
}

export function retryPlayback(): void {
	if (!lastPlayback) return;
	void playThought(lastPlayback.slug, lastPlayback.title, lastPlayback.root);
}

export function togglePlayback(): void {
	engine?.toggle();
}

export function skipPlayback(seconds: number): void {
	engine?.skip(seconds);
}

export function seekPlayback(seconds: number): void {
	engine?.seekTo(seconds);
}

export function setPlaybackRate(rate: number): void {
	engine?.setRate(rate);
}

export function stopPlayback(): void {
	preparedRef = null;
	pageReader.nowPlaying = null;
	pageReader.scrollLocked = true;
	engine?.reset();
}

export function getSentences(): Array<string> {
	return engine?.getSentences() ?? [];
}

export function getProgress(): { index: number; fraction: number } | null {
	return engine?.getProgress() ?? null;
}

export function unlockScroll(): void {
	pageReader.scrollLocked = false;
}

export function lockScroll(): void {
	pageReader.scrollLocked = true;
}
