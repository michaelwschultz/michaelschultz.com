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
	atprotoRkey?: string;
};

export type PostListItem = PostMeta & {
	slug: string;
	path: string;
	wordCount: number;
	readingTime: string;
};

export type Post = PostListItem & {
	body: string;
};
