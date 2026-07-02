import { json } from '@sveltejs/kit';
import { syncListening } from '$lib/listening/sync';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const prerender = false;

function isAuthorized(request: Request): boolean {
	const secret = env.CRON_SECRET;
	if (!secret) return false;

	const auth = request.headers.get('authorization');
	return auth === `Bearer ${secret}`;
}

export const GET: RequestHandler = async ({ request }) => {
	if (!isAuthorized(request)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const listening = await syncListening();
		return json({
			syncedAt: listening.syncedAt,
			count: listening.plays.length
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Sync failed';
		return json({ error: message }, { status: 500 });
	}
};
