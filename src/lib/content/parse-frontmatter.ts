import yaml from 'js-yaml';
import type { PostMeta } from './types';

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function parseFrontmatter(raw: string): { metadata: PostMeta; body: string } {
	const match = raw.match(FRONTMATTER_RE);
	if (!match) {
		return { metadata: { title: '', date: '', tags: [] }, body: raw };
	}

	const metadata = yaml.load(match[1]) as PostMeta;
	return { metadata, body: match[2] };
}
