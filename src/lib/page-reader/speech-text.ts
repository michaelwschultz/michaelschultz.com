import { collectTextNodes } from './word-highlight';

/** Extract narration text from a rendered article root (title + body). */
export function extractSpeechText(root: HTMLElement): string | null {
	const { fullText } = collectTextNodes(root);
	const trimmed = fullText.trim();
	return trimmed.length > 0 ? trimmed : null;
}
