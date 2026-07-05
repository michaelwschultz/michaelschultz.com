import { readdirSync, writeFileSync } from 'node:fs';
import { StandardSitePublisher } from '@ewanc26/svelte-standard-site/publisher';
import { transformContent } from '@ewanc26/svelte-standard-site/content';
import { getPublicationAtUri } from '@ewanc26/svelte-standard-site/verification';
import matter from 'gray-matter';
import { buildMarkpubContent, extractRkey, toIsoDate } from './markpub.mjs';
import {
	getPublisherConfig,
	readThoughtFile,
	requirePublicationRkey,
	siteUrl,
	thoughtsDir
} from './standard-site.mjs';

export async function publishThought(slug, publisher, publicationAtUri) {
	const { path, raw } = readThoughtFile(slug);
	const { data, content } = matter(raw);

	if (data.draft) {
		console.log(`Skipping draft: ${slug}`);
		return;
	}

	const postPath = `/thoughts/${slug}/`;
	const transformed = transformContent(content, { baseUrl: siteUrl, postPath });
	const markpubContent = buildMarkpubContent(transformed, data);

	const documentInput = {
		site: publicationAtUri,
		title: data.title,
		path: postPath,
		description: data.summary,
		publishedAt: toIsoDate(data.date),
		tags: data.tags ?? [],
		textContent: transformed.textContent,
		content: markpubContent
	};

	if (data.atprotoRkey) {
		await publisher.updateDocument(data.atprotoRkey, {
			...documentInput,
			updatedAt: new Date().toISOString()
		});
		console.log(`Updated: ${data.title}`);
		return;
	}

	const result = await publisher.publishDocument(documentInput);
	const rkey = extractRkey(result.uri);
	const updated = matter.stringify(content, { ...data, atprotoRkey: rkey });
	writeFileSync(path, updated, 'utf8');
	console.log(`Published: ${data.title}`);
	console.log(`  → ${result.uri}`);
	console.log(`  Wrote atprotoRkey to ${path}`);
}

export async function createPublisher() {
	const publisher = new StandardSitePublisher(getPublisherConfig());
	await publisher.login();
	const publicationRkey = requirePublicationRkey();
	const publicationAtUri = getPublicationAtUri(publisher.getDid(), publicationRkey);
	return { publisher, publicationAtUri };
}

export function listThoughtSlugs() {
	return readdirSync(thoughtsDir)
		.filter((file) => file.endsWith('.md'))
		.map((file) => file.replace(/\.md$/, ''));
}
