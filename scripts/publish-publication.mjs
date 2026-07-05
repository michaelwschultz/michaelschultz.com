import { StandardSitePublisher } from '@ewanc26/svelte-standard-site/publisher';
import { getPublicationAtUri } from '@ewanc26/svelte-standard-site/verification';
import {
	getPublisherConfig,
	publicationDescription,
	publicationName,
	siteUrl,
	writeWellKnown
} from './lib/standard-site.mjs';

const publisher = new StandardSitePublisher(getPublisherConfig());
await publisher.login();

const result = await publisher.publishPublication({
	name: publicationName,
	url: siteUrl,
	description: publicationDescription,
	preferences: {
		showInDiscover: true
	}
});

const did = publisher.getDid();
const publicationRkey = result.uri.split('/').pop();
const publicationAtUri = getPublicationAtUri(did, publicationRkey);
const wellKnownUri = writeWellKnown(did, publicationRkey);

console.log('Publication created.');
console.log(`AT-URI: ${publicationAtUri}`);
console.log(`Publication rkey: ${publicationRkey}`);
console.log(`Wrote ${wellKnownUri} to static/.well-known/site.standard.publication`);
console.log('');
console.log('Add to .env and GitHub Environment secrets:');
console.log(`PUBLIC_ATPROTO_DID=${did}`);
console.log(`PUBLIC_PUBLICATION_RKEY=${publicationRkey}`);
