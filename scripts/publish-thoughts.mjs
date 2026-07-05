import {
	createPublisher,
	listThoughtSlugs,
	publishThought
} from './lib/publish-thought.mjs';

const { publisher, publicationAtUri } = await createPublisher();

for (const slug of listThoughtSlugs()) {
	await publishThought(slug, publisher, publicationAtUri);
}
