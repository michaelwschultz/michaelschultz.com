<script lang="ts">
	import { Headphones, Pause, Play } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import { getReaderCapability } from '$lib/page-reader/capability';
	import {
		pageReader,
		isCurrentThought,
		playThought,
		togglePlayback
	} from '$lib/page-reader/page-reader.svelte';
	import PlaybackInfoIcon from './PlaybackInfoIcon.svelte';

	interface Props {
		slug: string;
		title: string;
		readerRoot: HTMLElement | null;
	}

	let { slug, title, readerRoot }: Props = $props();

	const capability = $derived(browser ? getReaderCapability() : { supported: false, reason: null });
	const isCurrent = $derived(isCurrentThought(slug));
	const status = $derived(pageReader.state.status);
	const isPlaying = $derived(isCurrent && status === 'playing');
	const isPaused = $derived(isCurrent && status === 'paused');
	const isLoading = $derived(
		isCurrent && (status === 'loading-model' || status === 'generating')
	);

	const label = $derived.by(() => {
		if (isLoading) return 'Loading…';
		if (isPlaying) return 'Pause';
		if (isPaused) return 'Resume';
		return 'Listen';
	});

	const ariaLabel = $derived.by(() => {
		if (isLoading) return 'Loading audio';
		if (isPlaying) return 'Pause listening';
		if (isPaused) return 'Resume listening';
		return 'Listen to this article';
	});

	async function onClick() {
		if (!readerRoot || !capability.supported) return;

		if (!isCurrent || status === 'idle' || status === 'error') {
			await playThought(slug, title, readerRoot);
			return;
		}

		if (isLoading) return;
		togglePlayback();
	}
</script>

{#if capability.supported}
	<div class="inline-flex items-center gap-0.5">
		<button
			type="button"
			class="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed {isPlaying || isPaused
				? 'border-primary-500 bg-primary-500 text-white hover:brightness-105'
				: 'border-gray-200 text-gray-900 hover:border-primary-500 hover:text-primary-600 dark:border-gray-700 dark:text-gray-100 dark:hover:border-primary-500 dark:hover:text-primary-400'}"
			aria-label={ariaLabel}
			disabled={!readerRoot || isLoading}
			onclick={onClick}
		>
			{#if isPlaying}
				<Pause class="h-5 w-5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
			{:else if isPaused}
				<Play class="h-5 w-5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
			{:else}
				<Headphones class="h-5 w-5" aria-hidden="true" />
			{/if}
			{label}
		</button>
		<PlaybackInfoIcon />
	</div>
{:else if browser}
	<p class="text-sm text-gray-500 dark:text-gray-400" title={capability.reason ?? undefined}>
		Listen unavailable
	</p>
{/if}
