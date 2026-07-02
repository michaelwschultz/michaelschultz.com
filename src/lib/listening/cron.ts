import cron from 'node-cron';
import { syncListening } from '$lib/listening/sync';

const DEFAULT_CRON = '0 7,11,14,17,21 * * *';



let started = false;

export function startListeningCron(): void {
	if (started) return;
	started = true;

	const schedule = process.env.SYNC_CRON ?? DEFAULT_CRON;
	if (!cron.validate(schedule)) {
		console.error(`Invalid SYNC_CRON expression: ${schedule}`);
		return;
	}

	cron.schedule(schedule, async () => {
		try {
			const result = await syncListening();
			console.info(`Listening sync complete (${result.plays.length} plays)`);
		} catch (error) {
			console.error('Scheduled listening sync failed:', error);
		}
	});

	console.info(`Listening sync scheduled: ${schedule}`);
}
