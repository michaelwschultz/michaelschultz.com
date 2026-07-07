import {
	layoutNextRichInlineLineRange,
	materializeRichInlineLineRange,
	prepareRichInline,
	type PreparedRichInline,
	type RichInlineCursor
} from '@chenglou/pretext/rich-inline';
import { heroIntroSpecs, type HeroIntroSpec } from '$lib/content/hero-intro';

export const BODY_FONT = '400 16px "Space Grotesk", sans-serif';
export const HIGHLIGHT_FONT = '600 16px "Space Grotesk", sans-serif';
export const LINE_HEIGHT = 26;
export const OBSTACLE_GAP = 14;
export const OBSTACLE_MIN_WIDTH = 400;
export const MIN_FLOW_WIDTH = 72;

export const FRAG_CLASS_NAMES = {
	body: 'hero-frag hero-frag--body',
	highlight: 'hero-frag hero-frag--highlight'
} satisfies Record<HeroIntroSpec['style'], string>;

export type HeroIntroRect = {
	left: number;
	top: number;
	right: number;
	bottom: number;
};

export type PreparedHeroIntro = {
	classNames: string[];
	flow: PreparedRichInline;
};

export type HeroIntroLineFragment = {
	className: string;
	leadingGap: number;
	text: string;
};

export type HeroIntroLine = {
	fragments: HeroIntroLineFragment[];
	x: number;
};

export type LayoutHeroIntroOptions = {
	containerWidth: number;
	gap?: number;
	imageRect: HeroIntroRect | null;
	lineHeight?: number;
};

export type HeroIntroLayout = {
	bodyHeight: number;
	lines: HeroIntroLine[];
};

export function prepareHeroIntro(
	specs: HeroIntroSpec[] = heroIntroSpecs
): PreparedHeroIntro {
	const normalized = normalizeHeroIntroSpecs(specs);
	const classNames = normalized.map((spec) => FRAG_CLASS_NAMES[spec.style]);

	const flow = prepareRichInline(
		normalized.map((spec) => ({
			text: spec.text,
			font: spec.style === 'highlight' ? HIGHLIGHT_FONT : BODY_FONT
		}))
	);

	return { classNames, flow };
}

/** Glue punctuation-only fragments onto the previous item so line breaks cannot orphan them. */
function normalizeHeroIntroSpecs(specs: HeroIntroSpec[]): HeroIntroSpec[] {
	const normalized: HeroIntroSpec[] = [];

	for (const spec of specs) {
		const trimmed = spec.text.trim();
		const isPunctuationOnly = trimmed.length > 0 && /^[.,!?;:]+$/.test(trimmed);

		if (normalized.length > 0 && isPunctuationOnly) {
			const previous = normalized[normalized.length - 1]!;
			normalized[normalized.length - 1] = {
				...previous,
				text: previous.text + spec.text
			};
			continue;
		}

		normalized.push({ ...spec });
	}

	return normalized;
}

function lineBandOverlapsRect(
	lineY: number,
	lineHeight: number,
	rect: HeroIntroRect
): boolean {
	const bandBottom = lineY + lineHeight;
	return bandBottom > rect.top && lineY < rect.bottom;
}

function lineLayoutForBand(
	lineY: number,
	lineHeight: number,
	containerWidth: number,
	imageRect: HeroIntroRect | null,
	gap: number
): { maxWidth: number; x: number } {
	if (!imageRect || !lineBandOverlapsRect(lineY, lineHeight, imageRect)) {
		return { x: 0, maxWidth: containerWidth };
	}

	const leftColumnWidth = imageRect.left - gap;
	const rightColumnX = imageRect.right + gap;
	const rightColumnWidth = containerWidth - rightColumnX;

	if (leftColumnWidth < MIN_FLOW_WIDTH && rightColumnWidth < MIN_FLOW_WIDTH) {
		return { x: 0, maxWidth: containerWidth };
	}

	// Hero copy sits in the left column; use the right side only when it is clearly wider.
	if (leftColumnWidth >= rightColumnWidth) {
		return {
			x: 0,
			maxWidth: Math.max(0, leftColumnWidth)
		};
	}

	return {
		x: rightColumnX,
		maxWidth: Math.max(0, rightColumnWidth)
	};
}

export function layoutHeroIntro(
	prepared: PreparedHeroIntro,
	options: LayoutHeroIntroOptions
): HeroIntroLayout {
	const {
		containerWidth,
		imageRect,
		lineHeight = LINE_HEIGHT,
		gap = OBSTACLE_GAP
	} = options;

	const lines: HeroIntroLine[] = [];
	let cursor: RichInlineCursor | undefined;
	let y = 0;
	const maxLineAttempts = 200;
	let attempts = 0;

	while (attempts < maxLineAttempts) {
		attempts += 1;

		const { maxWidth, x } = lineLayoutForBand(
			y,
			lineHeight,
			containerWidth,
			imageRect,
			gap
		);

		if (maxWidth <= 0) {
			y += lineHeight;
			if (imageRect && y < imageRect.bottom) {
				continue;
			}
			break;
		}

		const range = layoutNextRichInlineLineRange(prepared.flow, maxWidth, cursor);
		if (range === null) {
			break;
		}

		const line = materializeRichInlineLineRange(prepared.flow, range);
		lines.push({
			x,
			fragments: line.fragments.map((fragment) => ({
				className: prepared.classNames[fragment.itemIndex]!,
				leadingGap: fragment.gapBefore,
				text: fragment.text
			}))
		});

		cursor = range.end;
		y += lineHeight;
	}

	const bodyHeight = lines.length === 0 ? lineHeight : lines.length * lineHeight;

	return { lines, bodyHeight };
}

export function relativeRectWithinRoot(
	element: HTMLElement,
	root: HTMLElement
): HeroIntroRect {
	const elementRect = element.getBoundingClientRect();
	const rootRect = root.getBoundingClientRect();

	return {
		left: elementRect.left - rootRect.left,
		top: elementRect.top - rootRect.top,
		right: elementRect.right - rootRect.left,
		bottom: elementRect.bottom - rootRect.top
	};
}
