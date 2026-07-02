#!/usr/bin/env node

import { loadEnvFile } from './load-env.mjs';

loadEnvFile();

const url = process.env.SYNC_URL ?? 'http://127.0.0.1:3000/api/cron/sync-listening';
const secret = process.env.CRON_SECRET;

if (!secret) {
	console.error('CRON_SECRET is required');
	process.exit(1);
}

const response = await fetch(url, {
	headers: {
		Authorization: `Bearer ${secret}`
	}
});

const body = await response.text();

if (!response.ok) {
	console.error(`Sync failed (${response.status}): ${body}`);
	process.exit(1);
}

console.log(body);
