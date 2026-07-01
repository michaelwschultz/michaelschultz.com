import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import type { ListeningData, ListeningPlay } from '$lib/listening/types';
import { getLastFmProfileUrl } from '$lib/listening/lastfm';

const SCHEMA_VERSION = 1;

type PlayRow = {
	id: string;
	track: string;
	artist: string;
	album: string | null;
	artwork_url: string | null;
	played_at: string;
	is_now_playing: number;
	source: string;
	source_url: string;
	youtube_url: string;
	sort_order: number;
};

let db: Database.Database | null = null;

function getDatabasePath(): string {
	return process.env.DATABASE_PATH ?? './data/listening.db';
}

function getDefaultProfileUrl(): string {
	const username = process.env.LASTFM_USER ?? 'michaelschultz';
	return getLastFmProfileUrl(username);
}

function mapPlayRow(row: PlayRow): ListeningPlay {
	return {
		id: row.id,
		track: row.track,
		artist: row.artist,
		album: row.album ?? undefined,
		artworkUrl: row.artwork_url ?? undefined,
		playedAt: row.played_at,
		isNowPlaying: row.is_now_playing === 1,
		source: row.source as ListeningPlay['source'],
		sourceUrl: row.source_url,
		youtubeUrl: row.youtube_url
	};
}

function getMetaValue(key: string): string | null {
	const database = getDb();
	const row = database.prepare('SELECT value FROM listening_meta WHERE key = ?').get(key) as
		| { value: string }
		| undefined;
	return row?.value ?? null;
}

function setMetaValue(key: string, value: string): void {
	const database = getDb();
	database
		.prepare('INSERT INTO listening_meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
		.run(key, value);
}

function runMigrations(database: Database.Database): void {
	database.exec(`
		CREATE TABLE IF NOT EXISTS listening_meta (
			key TEXT PRIMARY KEY,
			value TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS listening_plays (
			id TEXT PRIMARY KEY,
			track TEXT NOT NULL,
			artist TEXT NOT NULL,
			album TEXT,
			artwork_url TEXT,
			played_at TEXT NOT NULL,
			is_now_playing INTEGER NOT NULL DEFAULT 0,
			source TEXT NOT NULL DEFAULT 'lastfm',
			source_url TEXT NOT NULL,
			youtube_url TEXT NOT NULL,
			sort_order INTEGER NOT NULL
		);

		CREATE INDEX IF NOT EXISTS idx_listening_plays_sort ON listening_plays (sort_order);
	`);

	const version = Number(getMetaValue('schema_version') ?? '0');
	if (version < SCHEMA_VERSION) {
		setMetaValue('schema_version', String(SCHEMA_VERSION));
	}
}

export function getDb(): Database.Database {
	if (db) return db;

	const path = getDatabasePath();
	mkdirSync(dirname(path), { recursive: true });
	db = new Database(path);
	db.pragma('journal_mode = WAL');
	runMigrations(db);
	return db;
}

export function getListeningFromDb(): ListeningData {
	const database = getDb();
	const rows = database
		.prepare(
			`SELECT id, track, artist, album, artwork_url, played_at, is_now_playing, source, source_url, youtube_url, sort_order
			 FROM listening_plays
			 ORDER BY sort_order ASC`
		)
		.all() as PlayRow[];

	return {
		syncedAt: getMetaValue('synced_at'),
		profileUrl: getMetaValue('profile_url') ?? getDefaultProfileUrl(),
		plays: rows.map(mapPlayRow)
	};
}

export function saveListeningPlays(plays: ListeningPlay[], profileUrl: string): void {
	const database = getDb();
	const syncedAt = new Date().toISOString();

	const replaceAll = database.transaction(() => {
		database.prepare('DELETE FROM listening_plays').run();

		const insert = database.prepare(`
			INSERT INTO listening_plays (
				id, track, artist, album, artwork_url, played_at, is_now_playing, source, source_url, youtube_url, sort_order
			) VALUES (
				@id, @track, @artist, @album, @artworkUrl, @playedAt, @isNowPlaying, @source, @sourceUrl, @youtubeUrl, @sortOrder
			)
		`);

		plays.forEach((play, index) => {
			insert.run({
				id: play.id,
				track: play.track,
				artist: play.artist,
				album: play.album ?? null,
				artworkUrl: play.artworkUrl ?? null,
				playedAt: play.playedAt,
				isNowPlaying: play.isNowPlaying ? 1 : 0,
				source: play.source,
				sourceUrl: play.sourceUrl,
				youtubeUrl: play.youtubeUrl,
				sortOrder: index
			});
		});

		setMetaValue('synced_at', syncedAt);
		setMetaValue('profile_url', profileUrl);
	});

	replaceAll();
}
