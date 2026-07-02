<script lang="ts">
	import ListeningItem from '$lib/components/ListeningItem.svelte';
	import { site } from '$lib/config/site';
	import { formatSyncedAt } from '$lib/utils/relative-time';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const updatedLabel = $derived(formatSyncedAt(data.listening.syncedAt, site.locale));
</script>

<svelte:head>
	<title>Listening | {site.title}</title>
	<meta
		name="description"
		content="Recent music I've been listening to, scrobbled from Last.fm."
	/>
</svelte:head>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<h1
			class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
		>
			Listening
		</h1>
		<p class="text-lg leading-7 text-gray-500 dark:text-gray-400">
			What I've been playing lately, scrobbled via
			<a
				href={data.listening.profileUrl}
				class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
				target="_blank"
				rel="noopener noreferrer"
			>
				Last.fm
			</a>.
		</p>
	</div>

	{#if data.listening.plays.length > 0}
		<ul class="divide-y divide-gray-200 dark:divide-gray-700">
			{#each data.listening.plays as play (play.id)}
				<ListeningItem {play} />
			{/each}
		</ul>

		<div class="py-8 text-sm text-gray-500 dark:text-gray-400">
			{#if updatedLabel}
				<p>Updated {updatedLabel}.</p>
			{/if}
			<p class="mt-1">
				<a
					href={data.listening.profileUrl}
					class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
					target="_blank"
					rel="noopener noreferrer"
				>
					See full history on Last.fm →
				</a>
			</p>
		</div>
	{:else}
		<div class="py-12 text-gray-500 dark:text-gray-400">
			<p>No recent plays yet. Listening data syncs automatically throughout the day.</p>
		</div>
	{/if}
</div>
