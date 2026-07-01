import { json } from '@sveltejs/kit';
import { getBlueskyStatus } from '$lib/bluesky/status';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async () => {
	try {
		const status = await getBlueskyStatus();
		return json(
			{ status },
			{
				headers: {
					'Cache-Control': 'public, max-age=60'
				}
			}
		);
	} catch {
		return json(
			{ status: null },
			{
				status: 503,
				headers: {
					'Cache-Control': 'no-store'
				}
			}
		);
	}
};
