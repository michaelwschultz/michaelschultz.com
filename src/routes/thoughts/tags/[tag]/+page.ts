import { getPostsByTag, getTagCounts } from '$lib/content/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export function entries() {
	const tagCounts = getTagCounts();
	return Object.keys(tagCounts).map((tag) => ({ tag }));
}

export const load: PageLoad = ({ params }) => {
	const tag = decodeURIComponent(params.tag);
	const posts = getPostsByTag(tag);
	if (posts.length === 0) {
		error(404, 'Not found');
	}
	const title = tag[0].toUpperCase() + tag.slice(1);
	return { tag, title, posts };
};
