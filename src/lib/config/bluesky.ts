export const bluesky = {
	handle: 'michaelschultz.com',
	/** Relay used to resolve handles and repo metadata before reading custom records from the PDS. */
	relay: 'https://bsky.social',
	statusCollection: 'com.michaelschultz.status',
	statusRkey: 'self',
	/** Server-side cache TTL when fetching status from Bluesky. */
	cacheTtlMs: 60_000
} as const;
