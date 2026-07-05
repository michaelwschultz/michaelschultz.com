import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { getPublicationAtUri } from '@ewanc26/svelte-standard-site/verification';
import { loadEnvFile } from './load-env.mjs';
import { wellKnownPath } from './lib/standard-site.mjs';

loadEnvFile();

const did = process.env.PUBLIC_ATPROTO_DID;
const publicationRkey = process.env.PUBLIC_PUBLICATION_RKEY;

if (!did || !publicationRkey) {
	console.error('Set PUBLIC_ATPROTO_DID and PUBLIC_PUBLICATION_RKEY in .env');
	process.exit(1);
}

const atUri = getPublicationAtUri(did, publicationRkey);
mkdirSync(dirname(wellKnownPath), { recursive: true });
writeFileSync(wellKnownPath, atUri, 'utf8');
console.log(`Wrote ${atUri} to static/.well-known/site.standard.publication`);
