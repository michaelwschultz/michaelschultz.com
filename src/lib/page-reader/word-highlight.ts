/**
 * Karaoke-style sentence highlighting for the page reader. We align the engine's
 * narration sentences to the article's rendered DOM (word by word) and paint the
 * active sentence with the CSS Custom Highlight API.
 */

/** Registered name for the custom highlight (see the `::highlight()` rule). */
const HIGHLIGHT_NAME = 'reader-word';

interface TextNodeSpan {
	node: Text;
	/** Start/end in normalized `fullText` coordinates. */
	start: number;
	end: number;
	/** Original DOM text (before `normalizeReaderWhitespace`). */
	raw: string;
}

interface WordToken {
	start: number;
	end: number;
	norm: string;
}

/** A narration sentence's run of DOM word-tokens, with timing weights. */
export interface SentenceRun {
	first: number;
	count: number;
	cum: Array<number>;
	total: number;
}

export interface HighlightMap {
	spans: Array<TextNodeSpan>;
	tokens: Array<WordToken>;
	sentenceTokens: Array<SentenceRun | null>;
}

interface HighlightLike {
	add(range: Range): void;
	clear(): void;
}

interface HighlightRegistryLike {
	set(name: string, highlight: HighlightLike): void;
	delete(name: string): void;
}

/** Collapse editor/HTML line wraps in a text run; block breaks are added separately. */
export function normalizeReaderWhitespace(text: string): string {
	return text.replace(/[\n\r\t\f\v]+/g, ' ').replace(/ {2,}/g, ' ');
}

/** Map a normalized offset inside `raw` back to a DOM character index. */
export function domOffsetAtNormalizedOffset(raw: string, normalizedOffset: number): number {
	if (normalizedOffset <= 0) return 0;
	const normalized = normalizeReaderWhitespace(raw);
	if (normalizedOffset >= normalized.length) return raw.length;

	for (let rawEnd = 1; rawEnd <= raw.length; rawEnd++) {
		if (normalizeReaderWhitespace(raw.slice(0, rawEnd)).length >= normalizedOffset) {
			return rawEnd;
		}
	}
	return raw.length;
}

export function blockAncestor(node: Node): Element | null {
	let el = node.parentElement;
	while (el) {
		const style = globalThis.getComputedStyle(el);
		const inline = style.display.startsWith('inline') || style.display === 'contents';
		if (!inline && style.cssFloat === 'none') return el;
		el = el.parentElement;
	}
	return null;
}

export function collectTextNodes(root: HTMLElement): {
	fullText: string;
	spans: Array<TextNodeSpan>;
} {
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	const spans: Array<TextNodeSpan> = [];
	let fullText = '';
	let prevBlock: Element | null = null;

	let current = walker.nextNode();
	while (current) {
		if (
			current instanceof Text &&
			current.textContent &&
			!current.parentElement?.closest('[data-reader-skip]')
		) {
			const block = blockAncestor(current);
			if (fullText && block !== prevBlock) fullText += '\n';
			prevBlock = block;

			const raw = current.textContent;
			const normalized = normalizeReaderWhitespace(raw);
			if (!normalized) {
				current = walker.nextNode();
				continue;
			}

			const start = fullText.length;
			fullText += normalized;
			spans.push({ node: current, start, end: fullText.length, raw });
		}
		current = walker.nextNode();
	}

	return { fullText, spans };
}

function rangeFromOffsets(
	spans: Array<TextNodeSpan>,
	start: number,
	end: number
): Range | null {
	if (start >= end) return null;

	const range = document.createRange();
	let started = false;

	for (const span of spans) {
		if (!started && start >= span.start && start < span.end) {
			range.setStart(
				span.node,
				domOffsetAtNormalizedOffset(span.raw, start - span.start)
			);
			started = true;
		}
		if (started && end > span.start && end <= span.end) {
			range.setEnd(span.node, domOffsetAtNormalizedOffset(span.raw, end - span.start));
			return range;
		}
	}

	return null;
}

function normalizeWord(word: string): string {
	return word.toLowerCase().replaceAll(/[^\p{L}\p{N}]+/gu, '');
}

function tokenizeWithOffsets(text: string): Array<WordToken> {
	const tokens: Array<WordToken> = [];
	const regex = /\S+/gu;
	let match = regex.exec(text);
	while (match) {
		const norm = normalizeWord(match[0]);
		if (norm) {
			tokens.push({
				start: match.index,
				end: match.index + match[0].length,
				norm
			});
		}
		match = regex.exec(text);
	}
	return tokens;
}

function sentenceWords(sentence: string): Array<string> {
	const words: Array<string> = [];
	for (const raw of sentence.split(/\s+/u)) {
		const norm = normalizeWord(raw);
		if (norm) words.push(norm);
	}
	return words;
}

function findSequence(
	tokens: Array<WordToken>,
	words: Array<string>,
	from: number
): number {
	const limit = tokens.length - words.length;
	for (let i = from; i <= limit; i++) {
		let matched = true;
		for (let k = 0; k < words.length; k++) {
			if (tokens[i + k].norm !== words[k]) {
				matched = false;
				break;
			}
		}
		if (matched) return i;
	}
	return -1;
}

export function buildHighlightMap(root: HTMLElement, sentences: Array<string>): HighlightMap {
	const { fullText, spans } = collectTextNodes(root);
	const tokens = tokenizeWithOffsets(fullText);
	const sentenceTokens: HighlightMap['sentenceTokens'] = [];

	let cursor = 0;
	for (const sentence of sentences) {
		const words = sentenceWords(sentence);
		if (words.length === 0) {
			sentenceTokens.push(null);
			continue;
		}
		const first = findSequence(tokens, words, cursor);
		if (first === -1) {
			sentenceTokens.push(null);
			continue;
		}

		const cum = [0];
		let total = 0;
		for (let k = 0; k < words.length; k++) {
			const token = tokens[first + k];
			total += token.end - token.start + 1;
			cum.push(total);
		}
		sentenceTokens.push({ first, count: words.length, cum, total });
		cursor = first + words.length;
	}

	return { spans, tokens, sentenceTokens };
}

export function tokenIndexForProgress(run: SentenceRun, fraction: number): number {
	const target = fraction * run.total;
	for (let i = 0; i < run.count; i++) {
		if (target < run.cum[i + 1]) return run.first + i;
	}
	return run.first + run.count - 1;
}

export function matchedSentenceCount(map: HighlightMap): number {
	return map.sentenceTokens.filter(Boolean).length;
}

export function rangeForToken(map: HighlightMap, index: number): Range | null {
	const token = map.tokens[index];
	if (!token) return null;
	return rangeFromOffsets(map.spans, token.start, token.end);
}

export function rangeForSentence(map: HighlightMap, run: SentenceRun): Range | null {
	const first = map.tokens[run.first];
	const last = map.tokens[run.first + run.count - 1];
	if (!first || !last) return null;
	return rangeFromOffsets(map.spans, first.start, last.end);
}

let activeHighlight: HighlightLike | null = null;
let lastHighlightKey = '';

function highlightRegistry(): HighlightRegistryLike | undefined {
	return (globalThis.CSS as unknown as { highlights?: HighlightRegistryLike })?.highlights;
}

function rangeKey(range: Range): string {
	return `${range.startContainer}:${range.startOffset}:${range.endContainer}:${range.endOffset}`;
}

export function setWordHighlight(range: Range): boolean {
	const registry = highlightRegistry();
	const Ctor = (
		globalThis as unknown as {
			Highlight?: new (...ranges: Array<Range>) => HighlightLike;
		}
	).Highlight;
	if (!registry || !Ctor) return false;

	const key = rangeKey(range);
	if (activeHighlight && key === lastHighlightKey) return true;

	if (!activeHighlight) {
		activeHighlight = new Ctor();
		registry.set(HIGHLIGHT_NAME, activeHighlight);
	}
	activeHighlight.clear();
	activeHighlight.add(range);
	lastHighlightKey = key;
	return true;
}

export function clearWordHighlight(): void {
	highlightRegistry()?.delete(HIGHLIGHT_NAME);
	activeHighlight = null;
	lastHighlightKey = '';
}

export function articleScrollContainers(root: HTMLElement): Array<HTMLElement> {
	const inner = findScrollContainer(root);
	return [inner];
}

function findScrollContainer(start: HTMLElement): HTMLElement {
	let node: HTMLElement | null = start;
	while (node) {
		const { overflowY } = globalThis.getComputedStyle(node);
		if (
			(overflowY === 'auto' || overflowY === 'scroll') &&
			node.scrollHeight > node.clientHeight
		) {
			return node;
		}
		node = node.parentElement;
	}
	const scrolling = start.ownerDocument.scrollingElement;
	return scrolling instanceof HTMLElement ? scrolling : start;
}

export function scrollWordIntoView(range: Range, root: HTMLElement): void {
	const scroller = findScrollContainer(root);
	const word = range.getBoundingClientRect();
	if (word.width === 0 && word.height === 0) return;

	const isDocScroller = scroller === root.ownerDocument.scrollingElement;
	const view = isDocScroller
		? { top: 0, height: globalThis.innerHeight }
		: scroller.getBoundingClientRect();
	const topBand = view.top + view.height * 0.2;
	const bottomBand = view.top + view.height * 0.75;
	if (word.top >= topBand && word.bottom <= bottomBand) return;

	const target = view.top + view.height * 0.4;
	scroller.scrollTo({
		top: scroller.scrollTop + (word.top - target),
		behavior: 'smooth'
	});
}
