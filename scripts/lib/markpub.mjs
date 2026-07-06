/**
 * Build an at.markpub.markdown content object for site.standard.document records.
 */
export function buildMarkpubContent(transformed, frontmatter) {
	const {
		draft: _draft,
		atprotoRkey: _atprotoRkey,
		lastmod: _lastmod,
		layout: _layout,
		images: _images,
		hero: _hero,
		canonicalUrl: _canonicalUrl,
		...publishMeta
	} = frontmatter;

	return {
		$type: 'at.markpub.markdown',
		flavor: 'gfm',
		renderingRules: 'markdown-it',
		extensions: ['YAML'],
		frontMatter: [publishMeta],
		text: {
			$type: 'at.markpub.text',
			markdown: transformed.markdown
		}
	};
}

/**
 * Convert a YYYY-MM-DD date (or ISO string) to ISO 8601 for publishedAt.
 */
export function toIsoDate(dateStr) {
	if (dateStr.includes('T')) {
		return new Date(dateStr).toISOString();
	}
	return `${dateStr}T12:00:00.000Z`;
}

export function extractRkey(uri) {
	return uri.split('/').pop();
}
