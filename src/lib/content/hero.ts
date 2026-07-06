/** Normalize a thought `hero` frontmatter value to a site path or absolute URL. */
export function normalizeHeroPath(hero: string | undefined): string | undefined {
	if (!hero?.trim()) return undefined;
	const trimmed = hero.trim();
	if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
	return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}
