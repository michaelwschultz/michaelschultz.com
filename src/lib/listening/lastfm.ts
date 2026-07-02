import { buildYoutubeSearchUrl } from '$lib/listening/youtube';
import type { ListeningPlay } from '$lib/listening/types';

const LASTFM_API = 'https://ws.audioscrobbler.com/2.0/';
const IMAGE_SIZES = ['mega', 'extralarge', 'large', 'medium', 'small'] as const;

type LastFmImage = {
	'#text': string;
	size: string;
};

type LastFmTrack = {
	name: string;
	url: string;
	artist: { '#text': string; name?: string };
	album?: { '#text': string };
	image?: LastFmImage[];
	date?: { uts: string; '#text': string };
	'@attr'?: { nowplaying?: string };
};

type LastFmRecentTracksResponse = {
	recenttracks?: {
		'@attr'?: { user: string };
		track?: LastFmTrack | LastFmTrack[];
	};
	error?: number;
	message?: string;
};

function asTrackArray(track: LastFmTrack | LastFmTrack[] | undefined): LastFmTrack[] {
	if (!track) return [];
	return Array.isArray(track) ? track : [track];
}

function pickArtworkUrl(images: LastFmImage[] | undefined): string | undefined {
	if (!images?.length) return undefined;

	for (const size of IMAGE_SIZES) {
		const image = images.find((entry) => entry.size === size);
		if (image?.['#text']) return image['#text'];
	}

	return undefined;
}

function getArtistName(track: LastFmTrack): string {
	return track.artist.name ?? track.artist['#text'] ?? 'Unknown artist';
}

function mapTrack(track: LastFmTrack, index: number): ListeningPlay {
	const artist = getArtistName(track);
	const isNowPlaying = track['@attr']?.nowplaying === 'true';
	const playedAt = isNowPlaying
		? new Date().toISOString()
		: new Date(Number(track.date?.uts) * 1000).toISOString();
	const id = isNowPlaying
		? `now-playing-${index}`
		: `${track.date?.uts ?? 'track'}-${index}`;

	return {
		id,
		track: track.name,
		artist,
		album: track.album?.['#text'] || undefined,
		artworkUrl: pickArtworkUrl(track.image),
		playedAt,
		isNowPlaying,
		source: 'lastfm',
		sourceUrl: track.url.startsWith('http') ? track.url : `https://${track.url}`,
		youtubeUrl: buildYoutubeSearchUrl(artist, track.name)
	};
}

export async function fetchRecentPlaysFromLastFm(options: {
	apiKey: string;
	username: string;
	limit: number;
}): Promise<ListeningPlay[]> {
	const params = new URLSearchParams({
		method: 'user.getrecenttracks',
		user: options.username,
		api_key: options.apiKey,
		format: 'json',
		limit: String(options.limit)
	});

	const response = await fetch(`${LASTFM_API}?${params.toString()}`);
	if (!response.ok) {
		throw new Error(`Last.fm request failed with status ${response.status}`);
	}

	const data = (await response.json()) as LastFmRecentTracksResponse;
	if (data.error) {
		throw new Error(data.message ?? `Last.fm error ${data.error}`);
	}

	return asTrackArray(data.recenttracks?.track).map(mapTrack);
}

export function getLastFmProfileUrl(username: string): string {
	return `https://www.last.fm/user/${encodeURIComponent(username)}`;
}
