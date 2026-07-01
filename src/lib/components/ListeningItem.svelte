<script lang="ts">
	import type { ListeningPlay } from '$lib/listening/types';
	import { site } from '$lib/config/site';
	import { formatRelativeTime } from '$lib/utils/relative-time';

	let { play }: { play: ListeningPlay } = $props();

	let imageError = $state(false);

	const showArtwork = $derived(Boolean(play.artworkUrl) && !imageError);
	const metaLine = $derived(
		[play.artist, play.album].filter(Boolean).join(' · ')
	);
</script>

<li class="py-6">
	<article class="flex gap-4 sm:gap-5">
		<div class="shrink-0">
			{#if showArtwork}
				<img
					src={play.artworkUrl}
					alt="{play.track} cover art"
					width="64"
					height="64"
					class="h-16 w-16 rounded-md object-cover shadow-sm"
					loading="lazy"
					onerror={() => (imageError = true)}
				/>
			{:else}
				<div
					class="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
					aria-hidden="true"
				>
					<svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"
						/>
					</svg>
				</div>
			{/if}
		</div>

		<div class="min-w-0 flex-1">
			<div class="flex items-start justify-between gap-3">
				<div class="min-w-0 space-y-1">
					<div class="flex flex-wrap items-center gap-2">
						<h2 class="text-lg font-bold leading-7 tracking-tight text-gray-900 dark:text-gray-100">
							<a
								href={play.youtubeUrl}
								class="hover:text-primary-500 dark:hover:text-primary-400"
								target="_blank"
								rel="noopener noreferrer"
							>
								{play.track}
							</a>
						</h2>
						{#if play.isNowPlaying}
							<span
								class="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs font-medium text-primary-600 dark:text-primary-400"
							>
								Now playing
							</span>
						{/if}
					</div>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						<a
							href={play.sourceUrl}
							class="hover:text-gray-700 dark:hover:text-gray-300"
							target="_blank"
							rel="noopener noreferrer"
						>
							{metaLine}
						</a>
					</p>
				</div>

				<div class="flex shrink-0 items-center gap-3">
					<time
						class="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
						datetime={play.playedAt}
					>
						{play.isNowPlaying ? 'Now' : formatRelativeTime(play.playedAt, site.locale)}
					</time>
					<a
						href={play.youtubeUrl}
						class="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Search {play.track} on YouTube Music"
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path
								d="M10 15.5v-7l6 3.5-6 3.5zm12-3.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</article>
</li>
