import { building } from '$app/environment';
import { startListeningCron } from '$lib/listening/cron';
import { getDb } from '$lib/listening/db';
import type { Handle } from '@sveltejs/kit';

let initialized = false;

function ensureListeningInfrastructure(): void {
	if (initialized || building) return;

	try {
		getDb();
		if (!startListeningCron()) return;
		initialized = true;
	} catch (error) {
		console.error('Failed to initialize listening infrastructure:', error);
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	ensureListeningInfrastructure();
	return resolve(event);
};
