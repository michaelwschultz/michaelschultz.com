import type { KokoroTTS } from 'kokoro-js';

import './readable-stream-polyfill';
import { hasWebGpu, isMobileReader } from './audio-context';

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';

/** Subset of the transformers progress payload we care about for the UI. */
interface ProgressInfo {
	status?: string;
	loaded?: number;
	total?: number;
}

export type ModelProgressHandler = (loaded: number, total: number) => void;

let ttsPromise: Promise<KokoroTTS> | null = null;

function pickDevice(): 'webgpu' | 'wasm' {
	// Mobile GPUs exhaust memory with WebGPU + fp32 Kokoro; WASM q8 is stable.
	if (isMobileReader()) return 'wasm';
	return hasWebGpu() ? 'webgpu' : 'wasm';
}

/**
 * Lazily import `kokoro-js` and load the model once per session. The heavy
 * (model + WASM/WebGPU) work is deferred until the reader is first used, and
 * the resulting instance is memoized so subsequent plays are instant.
 */
export function loadKokoro(onProgress?: ModelProgressHandler): Promise<KokoroTTS> {
	if (ttsPromise) return ttsPromise;

	ttsPromise = (async () => {
		const { KokoroTTS } = await import('kokoro-js');
		const device = pickDevice();
		return KokoroTTS.from_pretrained(MODEL_ID, {
			dtype: device === 'webgpu' ? 'fp32' : 'q8',
			device,
			progress_callback: (info: ProgressInfo) => {
				if (info.status === 'progress' && onProgress) {
					onProgress(info.loaded ?? 0, info.total ?? 0);
				}
			}
		});
	})().catch((error: unknown) => {
		console.error('[page-reader] kokoro load failed', error);
		ttsPromise = null;
		throw error;
	});

	return ttsPromise;
}

/** True once `loadKokoro()` has been called (in flight or resolved). */
export function isKokoroLoadStarted(): boolean {
	return ttsPromise !== null;
}

/**
 * Split text into sentences using Kokoro's own splitter so generation chunks
 * match what the model expects.
 */
export async function splitSentences(text: string): Promise<Array<string>> {
	const { TextSplitterStream } = await import('kokoro-js');
	const sentences: Array<string> = [];
	for (const paragraph of text.split(/\n+/)) {
		const normalized = paragraph.replace(/\s+/g, ' ').trim();
		if (!normalized) continue;
		const splitter = new TextSplitterStream();
		splitter.push(normalized);
		for (const sentence of splitter) {
			const trimmed = sentence.trim();
			if (trimmed.length > 0) sentences.push(trimmed);
		}
	}
	return sentences;
}
