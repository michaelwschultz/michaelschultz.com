<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { disposePageReader, initPageReader } from '$lib/page-reader/page-reader.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let PageReaderBar = $state<typeof import('$lib/components/page-reader/PageReaderBar.svelte').default | null>(
		null
	);

	onMount(() => {
		if (!browser) return;

		void initPageReader();
		void import('$lib/components/page-reader/PageReaderBar.svelte').then((module) => {
			PageReaderBar = module.default;
		});

		return () => {
			disposePageReader();
		};
	});
</script>

{@render children()}
{#if PageReaderBar}
	<PageReaderBar />
{/if}
