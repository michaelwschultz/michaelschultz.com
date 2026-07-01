export function buildYoutubeSearchUrl(artist: string, track: string): string {
	const query = encodeURIComponent(`${artist} ${track}`.trim());
	return `https://music.youtube.com/search?q=${query}`;
}
