import { getPost, getPublishedPosts } from '$lib/content/posts';
import { error } from '@sveltejs/kit';

export function entries() {
	return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post) error(404, 'Not found');
	return { post };
}
