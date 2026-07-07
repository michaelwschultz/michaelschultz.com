import type { KokoroTTS } from 'kokoro-js';

type GenerateOptions = NonNullable<Parameters<KokoroTTS['generate']>[1]>;
type GenerateResult = Awaited<ReturnType<KokoroTTS['generate']>>;

/** Kokoro is a singleton; serialize `generate()` — concurrent calls hang WebGPU. */
let generateQueue: Promise<unknown> = Promise.resolve();

export function generateSpeech(
	tts: KokoroTTS,
	text: string,
	options: GenerateOptions
): Promise<GenerateResult> {
	const run = generateQueue.then(() => tts.generate(text, options));
	generateQueue = run.then(
		() => undefined,
		() => undefined
	);
	return run;
}

/** Wait for any in-flight synthesis (e.g. before disposing during navigation). */
export function awaitGenerateIdle(): Promise<void> {
	return generateQueue.then(() => undefined);
}
