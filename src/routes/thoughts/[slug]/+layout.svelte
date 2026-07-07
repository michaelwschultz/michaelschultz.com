<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { awaitGenerateIdle } from '$lib/page-reader/kokoro-generate';
	import {
		disposePageReader,
		initPageReader,
		stopPlayback
	} from '$lib/page-reader/page-reader.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let PageReaderBar = $state<typeof import('$lib/components/page-reader/PageReaderBar.svelte').default | null>(
		null
	);

	const slug = $derived(page.params.slug);
	let previousSlug = $state<string | undefined>(undefined);

	function articleSlug(pathname: string): string | null {
		const match = pathname.match(/^\/thoughts\/([^/]+)\/?$/);
		const value = match?.[1];
		if (!value || value === 'tags' || value === 'page' || value === 'latest') return null;
		return value;
	}

	$effect(() => {
		if (!browser) return;
		if (previousSlug !== undefined && previousSlug !== slug) {
			stopPlayback();
		}
		previousSlug = slug;
	});

	if (browser) {
		beforeNavigate(({ from, to }) => {
			if (!from || !to) return;
			const fromSlug = articleSlug(from.url.pathname);
			if (!fromSlug) return;
			const toSlug = articleSlug(to.url.pathname);
			if (!toSlug || toSlug !== fromSlug) {
				stopPlayback();
			}
		});
	}

	onMount(() => {
		if (!browser) return;

		void initPageReader();
		void import('$lib/components/page-reader/PageReaderBar.svelte').then((module) => {
			PageReaderBar = module.default;
		});

		return () => {
			stopPlayback();
			// HMR remounts would dispose mid-synthesis and hang the shared Kokoro instance.
			if (import.meta.hot) return;
			void (async () => {
				await awaitGenerateIdle();
				disposePageReader();
			})();
		};
	});
</script>

{@render children()}
{#if PageReaderBar}
	<PageReaderBar />
{/if}
