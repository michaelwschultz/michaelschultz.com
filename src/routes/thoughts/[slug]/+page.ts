import { getAdjacentPosts, getPost, getPublishedPosts } from '$lib/content/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export function entries() {
	return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post || post.draft) {
		error(404, 'Not found');
	}
	const { prev, next } = getAdjacentPosts(params.slug);
	return { post, prev, next };
};
