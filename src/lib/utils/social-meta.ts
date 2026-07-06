import { site } from '$lib/config/site';
import type { Post } from '$lib/content/types';
import type { Page } from '@sveltejs/kit';

export type SocialMeta = {
	title: string;
	description: string;
	image: string;
	url: string;
	type: 'website' | 'article';
	publishedTime?: string;
};

const routeTitles: Record<string, string> = {
	'/work': 'Work',
	'/thoughts': 'Thoughts',
	'/thoughts/latest': 'Latest',
	'/thoughts/tags': 'Tags',
	'/games': 'Games',
	'/listening': 'Listening'
};

/** Normalize pathname to a canonical path without trailing slash (except `/`). */
export function canonicalPath(pathname: string): string {
	if (pathname === '/') return '/';
	return pathname.replace(/\/$/, '');
}

export function absoluteUrl(path: string): string {
	if (path.startsWith('http://') || path.startsWith('https://')) return path;
	return `${site.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function absoluteImageUrl(imagePath: string): string {
	return absoluteUrl(imagePath);
}

export function getPageSocialMeta(page: Page): SocialMeta {
	const path = canonicalPath(page.url.pathname);
	const defaultMeta: SocialMeta = {
		title: site.title,
		description: site.description,
		image: site.socialBanner,
		url: absoluteUrl(path),
		type: 'website'
	};

	const post = page.data?.post as Post | undefined;
	if (post) {
		const postPath = post.canonicalUrl ?? `/thoughts/${post.slug}`;
		return {
			title: post.title,
			description: post.summary ?? site.description,
			image: post.hero ?? post.images?.[0] ?? site.socialBanner,
			url: absoluteUrl(postPath),
			type: 'article',
			publishedTime: post.date
		};
	}

	const tagTitle = page.data?.title as string | undefined;
	if (tagTitle && page.route.id?.includes('tags/[tag]')) {
		return {
			...defaultMeta,
			title: `${tagTitle} | ${site.title}`,
			url: absoluteUrl(path)
		};
	}

	const sectionTitle = routeTitles[path];
	if (sectionTitle) {
		return {
			...defaultMeta,
			title: `${sectionTitle} | ${site.title}`,
			url: absoluteUrl(path)
		};
	}

	return defaultMeta;
}
