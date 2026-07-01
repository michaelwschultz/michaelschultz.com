import { building } from '$app/environment';
import { startListeningCron } from '$lib/listening/cron';
import { getDb } from '$lib/listening/db';
import type { Handle } from '@sveltejs/kit';

let initialized = false;

function ensureListeningInfrastructure(): void {
	if (initialized || building) return;
	initialized = true;
	getDb();
	startListeningCron();
}

export const handle: Handle = async ({ event, resolve }) => {
	ensureListeningInfrastructure();
	return resolve(event);
};
