import wellKnownPublication from '../../../static/.well-known/site.standard.publication?raw';
import { PUBLIC_ATPROTO_DID, PUBLIC_PUBLICATION_RKEY } from '$env/static/public';
import { site } from '$lib/config/site';

function didFromWellKnown(): string {
	const match = wellKnownPublication.trim().match(/^at:\/\/(did:[^/]+)\//);
	return match?.[1] ?? '';
}

function publicationRkeyFromWellKnown(): string {
	const match = wellKnownPublication.trim().match(/site\.standard\.publication\/(.+)$/);
	return match?.[1] ?? '';
}

export const standardSite = {
	publicationName: site.title,
	publicationDescription: site.description,
	siteUrl: site.siteUrl,
	/** DID for verification link tags — env override, else parsed from static well-known file. */
	did: PUBLIC_ATPROTO_DID || didFromWellKnown(),
	publicationRkey: PUBLIC_PUBLICATION_RKEY || publicationRkeyFromWellKnown()
} as const;
