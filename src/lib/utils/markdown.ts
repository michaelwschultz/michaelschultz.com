import MarkdownIt from 'markdown-it';
import type { Options } from 'markdown-it';
import type Renderer from 'markdown-it/lib/renderer.mjs';
import type Token from 'markdown-it/lib/token.mjs';

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true
});

function escapeAttr(value: string): string {
	return md.utils.escapeHtml(value);
}

function imageCaption(alt: string): string {
	return `An image of ${alt}`;
}

md.renderer.rules.image = (
	tokens: Array<Token>,
	idx: number,
	_options: Options,
	_env: unknown,
	_self: Renderer
): string => {
	const token = tokens[idx];
	const alt = token.content.trim();
	const src = token.attrGet('src') ?? '';
	const title = token.attrGet('title');

	const srcAttr = escapeAttr(src);
	const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
	const img = `<img src="${srcAttr}" alt=""${titleAttr} loading="lazy" decoding="async" />`;

	if (!alt) return img;

	const caption = escapeAttr(imageCaption(alt));
	return `<figure class="md-figure">${img}<figcaption>${caption}</figcaption></figure>`;
};

/** Standalone image paragraphs become block figures without an extra <p> wrapper. */
function unwrapLoneFigureParagraphs(html: string): string {
	return html.replace(
		/<p>\s*(<figure class="md-figure">[\s\S]*?<\/figure>)\s*<\/p>/gi,
		'$1'
	);
}

export function renderMarkdown(content: string): string {
	return unwrapLoneFigureParagraphs(md.render(content));
}
