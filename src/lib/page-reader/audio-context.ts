let audioContext: AudioContext | null = null;
let keepAliveSource: AudioBufferSourceNode | null = null;

const RESUME_TIMEOUT_MS = 250;

export function isMobileReader(): boolean {
	if (typeof navigator === 'undefined') return false;
	if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return true;
	return (
		navigator.maxTouchPoints > 0 &&
		typeof matchMedia !== 'undefined' &&
		matchMedia('(pointer: coarse)').matches
	);
}

/** WebGPU is available (Safari 17+, Chrome Android on supported GPUs). */
export function hasWebGpu(): boolean {
	if (typeof navigator === 'undefined') return false;
	return (navigator as Navigator & { gpu?: unknown }).gpu !== undefined;
}

export function getSharedAudioContext(): AudioContext | null {
	return audioContext;
}

/**
 * Unlock Web Audio during the user gesture (tap/click). Must run synchronously
 * in the handler before the first `await`, or iOS Safari stays silent.
 */
function primeAudioContext(ctx: AudioContext): void {
	void ctx.resume();

	try {
		const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
		const source = ctx.createBufferSource();
		source.buffer = buffer;
		source.connect(ctx.destination);
		source.start(0);
		source.stop(ctx.currentTime + 0.05);
	} catch {
		// best-effort routing unlock (iOS Safari and desktop after long async loads)
	}
}

export function unlockReaderAudio(): AudioContext | null {
	if (typeof window === 'undefined') return null;

	const Ctor =
		globalThis.AudioContext ??
		(globalThis as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
	if (Ctor === undefined) return null;

	if (!audioContext) {
		audioContext = new Ctor();
	}

	primeAudioContext(audioContext);
	return audioContext;
}

async function resumeWithTimeout(ctx: AudioContext): Promise<boolean> {
	if (ctx.state === 'running') return true;

	try {
		await Promise.race([
			ctx.resume(),
			new Promise<never>((_resolve, reject) => {
				globalThis.setTimeout(() => reject(new Error('resume timeout')), RESUME_TIMEOUT_MS);
			})
		]);
	} catch {
		return false;
	}

	const state = ctx.state as AudioContext['state'];
	return state === 'running';
}

export async function ensureAudioContextRunning(ctx: AudioContext): Promise<boolean> {
	primeAudioContext(ctx);
	return resumeWithTimeout(ctx);
}

/**
 * Play a silent loop so the browser does not suspend the context while Kokoro
 * loads and generates the first chunk (can take many seconds after the click).
 */
export function startReaderAudioKeepAlive(ctx: AudioContext): void {
	stopReaderAudioKeepAlive();

	try {
		const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
		const source = ctx.createBufferSource();
		source.buffer = buffer;
		source.loop = true;
		source.connect(ctx.destination);
		source.start(0);
		keepAliveSource = source;
	} catch {
		// best-effort; real playback will try again
	}
}

export function stopReaderAudioKeepAlive(): void {
	if (!keepAliveSource) return;

	const source = keepAliveSource;
	keepAliveSource = null;
	try {
		source.stop();
	} catch {
		// already stopped
	}
	source.disconnect();
}

/**
 * Unlock during the user gesture, then await resume and start keep-alive before
 * any heavy async work (model download / inference).
 */
export async function beginReaderAudioSession(): Promise<AudioContext | null> {
	const ctx = unlockReaderAudio();
	if (!ctx) return null;
	if (!(await ensureAudioContextRunning(ctx))) return null;
	startReaderAudioKeepAlive(ctx);
	return ctx;
}

/** Let the browser paint and handle input between heavy Kokoro inference steps. */
export function yieldToMain(): Promise<void> {
	const scheduler = globalThis.scheduler as { yield?: () => Promise<void> } | undefined;
	if (scheduler?.yield) {
		return scheduler.yield();
	}
	const delay = isMobileReader() ? 16 : 0;
	return new Promise((resolve) => {
		globalThis.setTimeout(resolve, delay);
	});
}
