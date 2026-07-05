export type ReaderCapability = {
	supported: boolean;
	reason: string | null;
};

function hasAudioContext(): boolean {
	if (typeof window === 'undefined') return false;
	return 'AudioContext' in window || 'webkitAudioContext' in window;
}

function hasCssHighlight(): boolean {
	if (typeof window === 'undefined') return false;
	return 'Highlight' in window && typeof CSS !== 'undefined' && 'highlights' in CSS;
}

/** Whether this browser can run the page reader (checked without instantiating AudioContext). */
export function getReaderCapability(): ReaderCapability {
	if (!hasAudioContext()) {
		return {
			supported: false,
			reason: 'Audio playback is not supported in this browser.'
		};
	}
	if (!hasCssHighlight()) {
		return {
			supported: false,
			reason: 'Sentence highlighting is not supported in this browser.'
		};
	}
	return { supported: true, reason: null };
}
