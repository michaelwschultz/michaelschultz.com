import { BskyAgent } from '@atproto/api';
import { loadEnvFile } from './load-env.mjs';

loadEnvFile();

const COLLECTION = 'com.michaelschultz.status';
const text = process.argv.slice(2).join(' ').trim();

if (!text) {
	console.error('Usage: pnpm status "Your status text"');
	process.exit(1);
}

const handle = process.env.BLUESKY_HANDLE ?? 'michaelschultz.com';
const password = process.env.BLUESKY_APP_PASSWORD;

if (!password) {
	console.error('Set BLUESKY_APP_PASSWORD to a Bluesky app password.');
	process.exit(1);
}

const agent = new BskyAgent({ service: 'https://bsky.social' });
await agent.login({ identifier: handle, password });

await agent.com.atproto.repo.putRecord({
	repo: agent.did,
	collection: COLLECTION,
	rkey: 'self',
	record: {
		$type: COLLECTION,
		text,
		createdAt: new Date().toISOString()
	}
});

console.log(`Status updated for @${handle}: ${text}`);
