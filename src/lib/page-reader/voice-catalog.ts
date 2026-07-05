/**
 * Kokoro American English voices shipped in `kokoro-js`, with quality grades from
 * [hexgrad/Kokoro-82M VOICES.md](https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md).
 */
export const AMERICAN_ENGLISH_VOICE_IDS = [
	'af_heart',
	'af_alloy',
	'af_aoede',
	'af_bella',
	'af_jessica',
	'af_kore',
	'af_nicole',
	'af_nova',
	'af_river',
	'af_sarah',
	'af_sky',
	'am_adam',
	'am_echo',
	'am_eric',
	'am_fenrir',
	'am_liam',
	'am_michael',
	'am_onyx',
	'am_puck',
	'am_santa'
] as const;

export type ReaderVoice = (typeof AMERICAN_ENGLISH_VOICE_IDS)[number];

export const DEFAULT_READER_VOICE: ReaderVoice = 'af_heart';
