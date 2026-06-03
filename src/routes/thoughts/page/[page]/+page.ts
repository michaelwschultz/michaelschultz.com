import { getPublishedPosts, POSTS_PER_PAGE } from '$lib/content/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export function entries() {
	const totalPages = Math.ceil(getPublishedPosts().length / POSTS_PER_PAGE) || 1;
	if (totalPages <= 1) return [];
	return Array.from({ length: totalPages - 1 }, (_, i) => ({
		page: String(i + 2)
	}));
}

export const load: PageLoad = ({ params }) => {
	const pageNumber = Number.parseInt(params.page, 10);
	const posts = getPublishedPosts();
	const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;

	if (pageNumber < 1 || pageNumber > totalPages || Number.isNaN(pageNumber)) {
		error(404, 'Not found');
	}

	if (pageNumber === 1) {
		error(404, 'Use /thoughts for page 1');
	}

	return {
		pageNumber,
		totalPages,
		posts,
		displayPosts: posts.slice(
			POSTS_PER_PAGE * (pageNumber - 1),
			POSTS_PER_PAGE * pageNumber
		)
	};
};
