export const PLAYBACK_INFO_TEXT =
	'Speech is synthesized in your browser while you listen locally. Inspiration for this feature comes from';

export const STANDARD_READER_URL = 'https://standard-reader.app';
export const STANDARD_READER_LABEL = 'standard-reader.app';

let playbackInfoTooltipCount = 0;

export function createPlaybackInfoTooltipId(): string {
	return `playback-info-${++playbackInfoTooltipCount}`;
}
