import {
	createPublisher,
	listThoughtSlugs,
	publishThought
} from './lib/publish-thought.mjs';

const slug = process.argv[2];

if (!slug) {
	console.error('Usage: pnpm publish-thought <slug>');
	process.exit(1);
}

const { publisher, publicationAtUri } = await createPublisher();
await publishThought(slug, publisher, publicationAtUri);
