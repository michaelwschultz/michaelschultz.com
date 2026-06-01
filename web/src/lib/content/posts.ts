import { slug as slugify } from 'github-slugger';
import type { Post, PostListItem, PostMeta } from './types';

type PostModule = {
	default: import('svelte').Component;
	metadata: PostMeta;
};

function estimateReadingTime(text: string): string {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.ceil(words / 200));
	return `${minutes} min read`;
}

const modules = import.meta.glob<PostModule>('../../content/thoughts/*.svx', {
	eager: true
});

function filepathToSlug(filepath: string): string {
	const name = filepath.split('/').pop() ?? '';
	return name.replace(/\.svx$/, '');
}

function metaToListItem(slug: string, metadata: PostMeta): PostListItem {
	return {
		...metadata,
		slug,
		path: `thoughts/${slug}`,
		tags: metadata.tags ?? [],
		readingTime: estimateReadingTime(metadata.summary ?? '')
	};
}

export function getAllPosts(): PostListItem[] {
	return Object.entries(modules).map(([path, mod]) =>
		metaToListItem(filepathToSlug(path), mod.metadata)
	);
}

export function getPublishedPosts(): PostListItem[] {
	return sortPosts(getAllPosts().filter((p) => !p.draft));
}

export function sortPosts(posts: PostListItem[]): PostListItem[] {
	return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
	const entry = Object.entries(modules).find(
		([path]) => filepathToSlug(path) === slug
	);
	if (!entry) return null;
	const [, mod] = entry;
	return {
		...metaToListItem(slug, mod.metadata),
		Content: mod.default
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
