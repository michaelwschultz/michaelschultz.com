export const bluesky = {
	handle: 'michaelschultz.com',
	apiBase: 'https://public.api.bsky.app',
	statusCollection: 'com.michaelschultz.status',
	statusRkey: 'self',
	/** Server-side cache TTL when fetching status from Bluesky. */
	cacheTtlMs: 60_000
} as const;
