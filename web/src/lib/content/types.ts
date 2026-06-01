export type PostMeta = {
	title: string;
	date: string;
	tags: string[];
	draft?: boolean;
	summary?: string;
	lastmod?: string;
	layout?: string;
	images?: string[];
	canonicalUrl?: string;
};

export type PostListItem = PostMeta & {
	slug: string;
	path: string;
	readingTime: string;
};

export type Post = PostListItem & {
	Content: import('svelte').Component;
};
