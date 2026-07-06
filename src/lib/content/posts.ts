import { slug as slugify } from 'github-slugger';
import { normalizeHeroPath } from './hero';
import { parseFrontmatter } from './parse-frontmatter';
import type { Post, PostListItem, PostMeta } from './types';

const rawModules = import.meta.glob<string>('../../content/thoughts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

function filepathToSlug(filepath: string): string {
	const name = filepath.split('/').pop() ?? '';
	return name.replace(/\.md$/, '');
}

function parseMarkdownFile(raw: string): { metadata: PostMeta; body: string } {
	return parseFrontmatter(raw);
}

export function countWords(text: string): number {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

export function formatReadingTime(wordCount: number): string {
	const minutes = Math.max(1, Math.ceil(wordCount / 200));
	return `${minutes} min read`;
}

function metaToListItem(slug: string, metadata: PostMeta, body: string): PostListItem {
	const wordCount = countWords(body || metadata.summary || '');
	return {
		...metadata,
		hero: normalizeHeroPath(metadata.hero),
		slug,
		path: `thoughts/${slug}`,
		tags: metadata.tags ?? [],
		wordCount,
		readingTime: formatReadingTime(wordCount)
	};
}

const parsedPosts = Object.entries(rawModules).map(([path, raw]) => {
	const { metadata, body } = parseMarkdownFile(raw);
	return { slug: filepathToSlug(path), metadata, body };
});

export function getAllPosts(): PostListItem[] {
	return parsedPosts.map(({ slug, metadata, body }) => metaToListItem(slug, metadata, body));
}

export function getPublishedPosts(): PostListItem[] {
	return sortPosts(getAllPosts().filter((p) => !p.draft));
}

export function sortPosts(posts: PostListItem[]): PostListItem[] {
	return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
	const entry = parsedPosts.find((post) => post.slug === slug);
	if (!entry) return null;
	return {
		...metaToListItem(entry.slug, entry.metadata, entry.body),
		body: entry.body
	};
}

export function getPostsByTag(tag: string): PostListItem[] {
	return getPublishedPosts().filter((post) =>
		post.tags.some((t) => slugify(t) === tag)
	);
}

export function getTagCounts(): Record<string, number> {
	const counts: Record<string, number> = {};
	for (const post of getPublishedPosts()) {
		for (const tag of post.tags) {
			const key = slugify(tag);
			counts[key] = (counts[key] ?? 0) + 1;
		}
	}
	return counts;
}

export function getAdjacentPosts(slug: string) {
	const posts = getPublishedPosts();
	const index = posts.findIndex((p) => p.slug === slug);
	return {
		prev: index < posts.length - 1 ? posts[index + 1] : undefined,
		next: index > 0 ? posts[index - 1] : undefined
	};
}

export const POSTS_PER_PAGE = 5;
