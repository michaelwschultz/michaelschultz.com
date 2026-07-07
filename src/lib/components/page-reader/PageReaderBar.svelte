<script lang="ts">
	import { Pause, Play, RotateCcw, X } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import { formatTime } from '$lib/page-reader/format-time';
	import { unlockReaderAudio } from '$lib/page-reader/audio-context';
	import {
		pageReader,
		isReaderActive,
		retryPlayback,
		seekPlayback,
		setPlaybackRate,
		skipPlayback,
		startListening,
		stopPlayback,
		togglePlayback
	} from '$lib/page-reader/page-reader.svelte';
	import SeekTrack from './SeekTrack.svelte';
	import SkipBackSecondsIcon from './SkipBackSecondsIcon.svelte';

	const SKIP_SECONDS = 15;
	const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 1.75, 2];

	let scrubValue = $state<number | null>(null);
	let speedOpen = $state(false);
	let visible = $state(false);
	let exiting = $state(false);

	const active = $derived(isReaderActive());

	$effect(() => {
		if (active) {
			exiting = false;
			visible = true;
		} else if (visible) {
			exiting = true;
			const timer = setTimeout(() => {
				visible = false;
				exiting = false;
			}, 200);
			return () => clearTimeout(timer);
		}
	});

	const isWarming = $derived(pageReader.state.status === 'loading-model');
	const isReady = $derived(pageReader.state.status === 'ready');
	const isError = $derived(pageReader.state.status === 'error');
	const showPause = $derived(
		pageReader.state.status === 'playing' || pageReader.state.status === 'generating'
	);
	const transportReady = $derived(
		pageReader.state.status === 'playing' ||
			pageReader.state.status === 'paused' ||
			pageReader.state.status === 'ready'
	);
	const playDisabled = $derived(isWarming);

	const kickerLabel = $derived.by(() => {
		if (isWarming) {
			const percent = Math.round(pageReader.state.modelProgress * 100);
			if (percent >= 100) return 'Synthesizing first sentence…';
			return percent > 0 ? `Preparing voice… ${percent}%` : 'Preparing voice…';
		}
		if (isReady) return 'Ready — press play';
		if (pageReader.state.status === 'generating') {
			const percent = Math.round(pageReader.state.generationProgress * 100);
			if (percent === 0) return 'Synthesizing first sentence…';
			return `Generating audio… ${percent}%`;
		}
		if (isError) return pageReader.state.error ?? 'Something went wrong';
		if (pageReader.state.status === 'paused') return 'Paused';
		return 'Reading aloud';
	});

	const previewTime = $derived(scrubValue ?? pageReader.state.currentTime);
	const fraction = $derived(pageReader.state.duration > 0 ? previewTime / pageReader.state.duration : 0);

	function onPlayClick() {
		unlockReaderAudio();
		if (isError) {
			void retryPlayback();
			return;
		}
		if (isReady) {
			void startListening();
			return;
		}
		togglePlayback();
	}
</script>

{#if browser && visible}
	<div
		class="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(1rem,env(safe-area-inset-bottom))]"
		aria-live="polite"
	>
		<div
			class="pointer-events-auto w-full max-w-[480px] rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-200 dark:border-gray-700 dark:bg-gray-900 md:max-w-[540px] {exiting
				? 'translate-y-4 opacity-0'
				: 'translate-y-0 opacity-100'}"
		>
			<div class="flex items-center gap-4 px-5 pt-5 pb-2">
				<div class="min-w-0 flex-1">
					<div
						class="flex items-center gap-1 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400"
					>
						<span>{kickerLabel}</span>
						{#if transportReady}
							<span class="opacity-50">·</span>
							<span class="font-mono normal-case tracking-normal text-gray-700 dark:text-gray-300">
								{formatTime(previewTime)}
							</span>
							<span class="normal-case tracking-normal">/ {formatTime(pageReader.state.duration)}</span>
						{/if}
					</div>
					{#if pageReader.nowPlaying}
						<p
							class="mt-1 truncate font-serif text-sm font-semibold text-gray-900 dark:text-gray-100"
						>
							{pageReader.nowPlaying.title}
						</p>
					{/if}
				</div>

				<div class="flex shrink-0 items-center gap-1">
					<button
						type="button"
						class="cursor-pointer rounded-full p-2 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-200 dark:hover:bg-gray-800"
						aria-label="Skip back 15 seconds"
						disabled={!transportReady || isReady}
						onclick={() => skipPlayback(-SKIP_SECONDS)}
					>
						<SkipBackSecondsIcon seconds={SKIP_SECONDS} class="h-6 w-6" />
					</button>

					<button
						type="button"
						class="rounded-xl p-3 transition active:scale-95 {playDisabled
							? 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
							: 'cursor-pointer bg-primary-500 text-white shadow-[0_2px_9px_-2px_var(--color-primary-500)] hover:brightness-105'}"
						aria-label={isError ? 'Retry' : showPause ? 'Pause' : 'Play'}
						disabled={playDisabled}
						onclick={onPlayClick}
					>
						{#if isError}
							<RotateCcw class="h-6 w-6" aria-hidden="true" />
						{:else if showPause}
							<Pause class="h-6 w-6" fill="currentColor" strokeWidth={0} aria-hidden="true" />
						{:else}
							<Play class="h-6 w-6" fill="currentColor" strokeWidth={0} aria-hidden="true" />
						{/if}
					</button>

					<div class="relative">
						<button
							type="button"
							class="inline-flex h-8 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full font-mono text-xs tabular-nums text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-200 dark:hover:bg-gray-800"
							aria-label="Playback speed"
							aria-haspopup="listbox"
							aria-expanded={speedOpen}
							disabled={!transportReady || isReady}
							onclick={() => (speedOpen = !speedOpen)}
						>
							{pageReader.state.rate}×
						</button>
						{#if speedOpen}
							<ul
								class="absolute right-0 bottom-full mb-2 min-w-20 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
								role="listbox"
								aria-label="Playback speed options"
							>
								{#each SPEED_OPTIONS as speed}
									<li>
										<button
											type="button"
											class="block w-full cursor-pointer px-3 py-1.5 text-left font-mono text-xs hover:bg-gray-100 dark:hover:bg-gray-800 {speed ===
											pageReader.state.rate
												? 'text-primary-600 dark:text-primary-400'
												: ''}"
											role="option"
											aria-selected={speed === pageReader.state.rate}
											onclick={() => {
												setPlaybackRate(speed);
												speedOpen = false;
											}}
										>
											{speed}×
										</button>
									</li>
								{/each}
							</ul>
						{/if}
					</div>

					<div class="mx-2 h-5 w-px bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>

					<button
						type="button"
						class="cursor-pointer rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
						aria-label="Stop listening"
						onclick={() => stopPlayback()}
					>
						<X class="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
			</div>

			<div class="px-5 pb-4">
				<SeekTrack
					{fraction}
					disabled={!transportReady || isReady}
					durationSeconds={pageReader.state.duration}
					currentSeconds={previewTime}
					onPreview={(seconds) => (scrubValue = seconds)}
					onCommit={(seconds) => {
						scrubValue = null;
						seekPlayback(seconds);
					}}
				/>
			</div>
		</div>
	</div>
{/if}
