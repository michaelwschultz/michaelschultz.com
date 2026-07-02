import { getListeningFromDb, saveListeningPlays } from '$lib/listening/db';
import { fetchRecentPlaysFromLastFm, getLastFmProfileUrl } from '$lib/listening/lastfm';
import type { ListeningData } from '$lib/listening/types';
import { env } from '$env/dynamic/private';

const PLAY_LIMIT = 30;
const STALE_AFTER_MS = 6 * 60 * 60 * 1000;

function getUsername(): string {
	return env.LASTFM_USER ?? 'michaelschultz';
}

function getApiKey(): string | undefined {
	return env.LASTFM_API_KEY;
}

let syncInFlight: Promise<ListeningData> | null = null;

async function runSyncListening(): Promise<ListeningData> {
	const apiKey = getApiKey();
	if (!apiKey) {
		throw new Error('LASTFM_API_KEY is not configured');
	}

	const username = getUsername();
	const plays = await fetchRecentPlaysFromLastFm({
		apiKey,
		username,
		limit: PLAY_LIMIT
	});

	saveListeningPlays(plays, getLastFmProfileUrl(username));
	return getListeningFromDb();
}

export function syncListening(): Promise<ListeningData> {
	if (!syncInFlight) {
		syncInFlight = runSyncListening().finally(() => {
			syncInFlight = null;
		});
	}

	return syncInFlight;
}

export function isListeningCacheStale(syncedAt: string | null): boolean {
	if (!syncedAt) return true;
	return Date.now() - new Date(syncedAt).getTime() > STALE_AFTER_MS;
}

export async function getListeningData(options?: { syncIfEmpty?: boolean }): Promise<ListeningData> {
	const cached = getListeningFromDb();
	const shouldSync =
		options?.syncIfEmpty !== false &&
		(cached.plays.length === 0 || isListeningCacheStale(cached.syncedAt));

	if (shouldSync && getApiKey()) {
		try {
			return await syncListening();
		} catch (error) {
			console.error('Failed to sync listening data:', error);
			if (cached.plays.length > 0) return cached;
		}
	}

	return cached;
}
