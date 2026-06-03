import { getPost, getPublishedPosts } from '$lib/content/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export function entries() {
	return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) error(404, 'Not found');
	return { post };
};
