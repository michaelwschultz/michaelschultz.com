import { bluesky } from '$lib/config/bluesky';

export type BlueskyStatus = {
	text: string;
	createdAt: string;
	expiresAt?: string;
};

type StatusRecord = BlueskyStatus & {
	$type: string;
};

type GetRecordResponse = {
	value: StatusRecord;
};

type CacheEntry = {
	status: BlueskyStatus | null;
	fetchedAt: number;
};

let cache: CacheEntry | null = null;

function isStatusRecord(value: unknown): value is StatusRecord {
	if (!value || typeof value !== 'object') return false;
	const record = value as StatusRecord;
	return typeof record.text === 'string' && typeof record.createdAt === 'string';
}

function isExpired(status: BlueskyStatus): boolean {
	if (!status.expiresAt) return false;
	return Date.now() > new Date(status.expiresAt).getTime();
}

function toStatus(record: StatusRecord): BlueskyStatus {
	return {
		text: record.text,
		createdAt: record.createdAt,
		...(record.expiresAt ? { expiresAt: record.expiresAt } : {})
	};
}

async function fetchStatusFromBluesky(): Promise<BlueskyStatus | null> {
	const url = new URL('/xrpc/com.atproto.repo.getRecord', bluesky.apiBase);
	url.searchParams.set('repo', bluesky.handle);
	url.searchParams.set('collection', bluesky.statusCollection);
	url.searchParams.set('rkey', bluesky.statusRkey);

	const response = await fetch(url);

	if (!response.ok) {
		const body = (await response.json().catch(() => null)) as { error?: string } | null;
		if (body?.error === 'RecordNotFound') {
			return null;
		}
		throw new Error(`Bluesky API error: ${response.status}`);
	}

	const data = (await response.json()) as GetRecordResponse;
	if (!isStatusRecord(data.value)) {
		return null;
	}

	const status = toStatus(data.value);
	return isExpired(status) ? null : status;
}

/** Fetch the current Bluesky status, with a short in-memory cache. */
export async function getBlueskyStatus(): Promise<BlueskyStatus | null> {
	const now = Date.now();
	if (cache && now - cache.fetchedAt < bluesky.cacheTtlMs) {
		return cache.status;
	}

	try {
		const status = await fetchStatusFromBluesky();
		cache = { status, fetchedAt: now };
		return status;
	} catch (error) {
		if (cache) {
			return cache.status;
		}
		throw error;
	}
}
