let audioContext: AudioContext | null = null;

export function isMobileReader(): boolean {
	if (typeof navigator === 'undefined') return false;
	if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return true;
	return (
		navigator.maxTouchPoints > 0 &&
		typeof matchMedia !== 'undefined' &&
		matchMedia('(pointer: coarse)').matches
	);
}

export function getSharedAudioContext(): AudioContext | null {
	return audioContext;
}

/**
 * Unlock Web Audio during the user gesture (tap/click). Must run synchronously
 * in the handler before the first `await`, or iOS Safari stays silent.
 */
export function unlockReaderAudio(): AudioContext | null {
	if (typeof window === 'undefined') return null;

	const Ctor =
		globalThis.AudioContext ??
		(globalThis as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
	if (Ctor === undefined) return null;

	if (!audioContext) {
		audioContext = new Ctor();
	}

	void audioContext.resume();

	try {
		const buffer = audioContext.createBuffer(1, 1, audioContext.sampleRate);
		const source = audioContext.createBufferSource();
		source.buffer = buffer;
		source.connect(audioContext.destination);
		source.start(0);
		source.stop(audioContext.currentTime + 0.05);
	} catch {
		// best-effort iOS routing unlock
	}

	return audioContext;
}

export async function ensureAudioContextRunning(ctx: AudioContext): Promise<boolean> {
	if (ctx.state === 'suspended') {
		try {
			await ctx.resume();
		} catch {
			return false;
		}
	}
	return ctx.state === 'running';
}
