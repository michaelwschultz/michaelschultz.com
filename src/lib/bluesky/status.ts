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

type DescribeRepoResponse = {
	didDoc?: {
		service?: Array<{
			id?: string;
			type?: string;
			serviceEndpoint?: string;
		}>;
	};
};

const relay = bluesky.relay;

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

function activeStatus(status: BlueskyStatus | null): BlueskyStatus | null {
	if (!status || isExpired(status)) return null;
	return status;
}

async function resolveDid(repo: string): Promise<string> {
	if (repo.startsWith('did:')) return repo;

	const url = new URL('/xrpc/com.atproto.identity.resolveHandle', relay);
	url.searchParams.set('handle', repo);

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to resolve Bluesky handle: ${response.status}`);
	}

	const data = (await response.json()) as { did?: string };
	if (!data.did) {
		throw new Error('Bluesky handle did not resolve to a DID');
	}

	return data.did;
}

async function resolvePdsEndpoint(did: string): Promise<string> {
	const url = new URL('/xrpc/com.atproto.repo.describeRepo', relay);
	url.searchParams.set('repo', did);

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to describe Bluesky repo: ${response.status}`);
	}

	const data = (await response.json()) as DescribeRepoResponse;
	const pds = data.didDoc?.service?.find(
		(service) => service.id === '#atproto_pds' || service.type === 'AtprotoPersonalDataServer'
	);
	const endpoint = pds?.serviceEndpoint?.replace(/\/$/, '');

	if (!endpoint) {
		throw new Error('Bluesky PDS endpoint not found');
	}

	return endpoint;
}

async function fetchStatusFromBluesky(): Promise<BlueskyStatus | null> {
	const did = await resolveDid(bluesky.handle);
	const pds = await resolvePdsEndpoint(did);

	const url = new URL('/xrpc/com.atproto.repo.getRecord', pds);
	url.searchParams.set('repo', did);
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
		return activeStatus(cache.status);
	}

	try {
		const status = await fetchStatusFromBluesky();
		cache = { status, fetchedAt: now };
		return status;
	} catch (error) {
		if (cache) {
			return activeStatus(cache.status);
		}
		throw error;
	}
}
