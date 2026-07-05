import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFile } from '../load-env.mjs';

loadEnvFile();

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

export const siteUrl = 'https://michaelschultz.com';
export const publicationName = 'Michael Schultz';
export const publicationDescription = 'Michael Schultz | software and design';
export const thoughtsDir = join(root, 'src/content/thoughts');
export const wellKnownPath = join(root, 'static/.well-known/site.standard.publication');

export function getPublisherConfig() {
	const handle = process.env.BLUESKY_HANDLE ?? 'michaelschultz.com';
	const password = process.env.BLUESKY_APP_PASSWORD;

	if (!password) {
		console.error('Set BLUESKY_APP_PASSWORD to a Bluesky app password.');
		process.exit(1);
	}

	return { identifier: handle, password };
}

export function requirePublicationRkey() {
	const rkey = process.env.PUBLIC_PUBLICATION_RKEY;
	if (!rkey) {
		console.error('Set PUBLIC_PUBLICATION_RKEY (run pnpm publish-publication first).');
		process.exit(1);
	}
	return rkey;
}

export function writeWellKnown(did, publicationRkey) {
	const atUri = `at://${did}/site.standard.publication/${publicationRkey}`;
	mkdirSync(dirname(wellKnownPath), { recursive: true });
	writeFileSync(wellKnownPath, atUri, 'utf8');
	return atUri;
}

export function readThoughtFile(slug) {
	const path = join(thoughtsDir, `${slug}.md`);
	return { path, raw: readFileSync(path, 'utf8') };
}
