import { building } from '$app/environment';
import { startListeningCron } from '$lib/listening/cron';
import { getDb } from '$lib/listening/db';

const INIT_RETRY_MS = 60_000;

type ListeningInitState = 'pending' | 'ready' | 'retry' | 'aborted';

let initState: ListeningInitState = 'pending';
let lastInitAttemptMs = 0;
let retryTimer: ReturnType<typeof setInterval> | undefined;

function scheduleListeningInitRetry(): void {
	if (building || retryTimer || initState === 'ready' || initState === 'aborted') return;

	retryTimer = setInterval(() => {
		if (initState === 'ready' || initState === 'aborted') {
			clearInterval(retryTimer!);
			retryTimer = undefined;
			return;
		}

		ensureListeningInfrastructure();
	}, INIT_RETRY_MS);
}

function ensureListeningInfrastructure(): void {
	if (building) return;
	if (initState === 'ready' || initState === 'aborted') return;

	const now = Date.now();
	if (initState === 'retry' && now - lastInitAttemptMs < INIT_RETRY_MS) return;

	lastInitAttemptMs = now;

	try {
		getDb();
		if (!startListeningCron()) {
			initState = 'aborted';
			return;
		}

		initState = 'ready';
		if (retryTimer) {
			clearInterval(retryTimer);
			retryTimer = undefined;
		}
	} catch (error) {
		initState = 'retry';
		console.error('Failed to initialize listening infrastructure:', error);
		scheduleListeningInitRetry();
	}
}

if (!building) {
	ensureListeningInfrastructure();
}
