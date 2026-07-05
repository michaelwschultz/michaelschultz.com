<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { disposePageReader, initPageReader } from '$lib/page-reader/page-reader.svelte';
	import PageReaderBar from '$lib/components/page-reader/PageReaderBar.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		if (browser) initPageReader();
		return () => {
			disposePageReader();
		};
	});
</script>

{@render children()}
{#if browser}
	<PageReaderBar />
{/if}
