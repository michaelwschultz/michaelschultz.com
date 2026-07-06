import { BskyAgent } from '@atproto/api';
import { loadEnvFile } from './load-env.mjs';

loadEnvFile();

const COLLECTION = 'com.michaelschultz.status';
const MAX_LENGTH = 280;
const MAX_GRAPHEMES = 140;
const REQUEST_TIMEOUT_MS = 30_000;

const text = process.argv.slice(2).join(' ').trim();

if (!text) {
	console.error('Usage: pnpm status "Your status text"');
	process.exit(1);
}

function countGraphemes(value) {
	const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
	let count = 0;
	for (const _ of segmenter.segment(value)) count++;
	return count;
}

function validateStatusText(value) {
	if (value.length > MAX_LENGTH) {
		console.error(
			`Status is too long: ${value.length} characters (max ${MAX_LENGTH}). Shorten it and try again.`
		);
		process.exit(1);
	}

	const graphemes = countGraphemes(value);
	if (graphemes > MAX_GRAPHEMES) {
		console.error(
			`Status is too long: ${graphemes} graphemes (max ${MAX_GRAPHEMES}). Shorten it and try again.`
		);
		process.exit(1);
	}
}

function withTimeout(promise, label) {
	return Promise.race([
		promise,
		new Promise((_, reject) => {
			setTimeout(
				() => reject(new Error(`${label} timed out after ${REQUEST_TIMEOUT_MS / 1000}s`)),
				REQUEST_TIMEOUT_MS
			);
		})
	]);
}

validateStatusText(text);

const handle = process.env.BLUESKY_HANDLE ?? 'michaelschultz.com';
const password = process.env.BLUESKY_APP_PASSWORD;

if (!password) {
	console.error('Set BLUESKY_APP_PASSWORD to a Bluesky app password.');
	process.exit(1);
}

const agent = new BskyAgent({ service: 'https://bsky.social' });

try {
	await withTimeout(
		agent.login({ identifier: handle, password }),
		'Bluesky login'
	);

	await withTimeout(
		agent.com.atproto.repo.putRecord({
			repo: agent.did,
			collection: COLLECTION,
			rkey: 'self',
			record: {
				$type: COLLECTION,
				text,
				createdAt: new Date().toISOString(),
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()
			}
		}),
		'Status publish'
	);
} catch (error) {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`Failed to update status: ${message}`);
	process.exit(1);
}

console.log(`Status updated for @${handle}: ${text}`);
