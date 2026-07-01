export type ListeningSource = 'lastfm' | 'teal';

export type ListeningPlay = {
	id: string;
	track: string;
	artist: string;
	album?: string;
	artworkUrl?: string;
	playedAt: string;
	isNowPlaying: boolean;
	source: ListeningSource;
	sourceUrl: string;
	youtubeUrl: string;
};

export type ListeningData = {
	syncedAt: string | null;
	profileUrl: string;
	plays: ListeningPlay[];
};
