<script lang="ts">
	import { browser } from '$app/environment';
	import {
		attachCloseOnResultNavigate,
		loadPagefindComponentUi,
		type PagefindModal
	} from '$lib/search/pagefind';
	import { onMount } from 'svelte';

	let {
		registerOpen
	}: {
		registerOpen: (open: () => void) => void;
	} = $props();

	let modal = $state<PagefindModal | null>(null);
	let ready = $state(false);

	onMount(() => {
		if (!browser) return;

		loadPagefindComponentUi()
			.then(() => {
				ready = true;
				registerOpen(() => modal?.open());
			})
			.catch(() => {
				registerOpen(() => {
					console.warn(
						'Pagefind search is not available. Run `pnpm build` in web/ (or use `pnpm preview`) to generate the search index.'
					);
				});
			});
	});

	$effect(() => {
		if (ready && modal) {
			registerOpen(() => modal?.open());
		}
	});

	$effect(() => {
		if (!modal) return;
		return attachCloseOnResultNavigate(modal);
	});
</script>

{#if ready}
	<pagefind-config base-url="/"></pagefind-config>
	<pagefind-modal bind:this={modal} reset-on-close></pagefind-modal>
{/if}
