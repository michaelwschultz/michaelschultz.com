import type { KokoroTTS } from 'kokoro-js';

import './readable-stream-polyfill';
import { isMobileReader } from './audio-context';

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
	if (isMobileReader()) return 'wasm';
	const nav = globalThis.navigator as (Navigator & { gpu?: unknown }) | undefined;
	return nav?.gpu === undefined ? 'wasm' : 'webgpu';
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

/**
 * Split text into sentences using Kokoro's own splitter so generation chunks
 * match what the model expects.
 */
export async function splitSentences(text: string): Promise<Array<string>> {
	const { TextSplitterStream } = await import('kokoro-js');
	const sentences: Array<string> = [];
	for (const paragraph of text.split(/\n+/)) {
		if (!paragraph.trim()) continue;
		const splitter = new TextSplitterStream();
		splitter.push(paragraph);
		for (const sentence of splitter) {
			const trimmed = sentence.trim();
			if (trimmed.length > 0) sentences.push(trimmed);
		}
	}
	return sentences;
}
