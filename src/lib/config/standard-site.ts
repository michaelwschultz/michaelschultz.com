import { env } from '$env/dynamic/public';
import { site } from '$lib/config/site';

export const standardSite = {
	publicationName: site.title,
	publicationDescription: site.description,
	siteUrl: site.siteUrl,
	get did(): string {
		return env.PUBLIC_ATPROTO_DID ?? '';
	},
	get publicationRkey(): string {
		return env.PUBLIC_PUBLICATION_RKEY ?? '';
	}
} as const;
