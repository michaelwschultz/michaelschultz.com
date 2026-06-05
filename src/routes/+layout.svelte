<script lang="ts">
	import "../app.css";
	import { onMount } from "svelte";
	import { configure } from "onedollarstats";
	import { page } from "$app/state";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	import PagefindSearch from "$lib/components/PagefindSearch.svelte";
	import SocialMeta from "$lib/components/SocialMeta.svelte";
	import { site } from "$lib/config/site";
	import { getPageSocialMeta } from "$lib/utils/social-meta";

	let { children } = $props();

	onMount(() => {
		configure({
			collectorUrl: "https://collector.onedollarstats.com/events",
			hostname: "michaelschultz.com",
			autocollect: true, // automatically tracks pageviews & clicks
			hashRouting: false, // track SPA hash route changes
			devmode: process.env.NODE_ENV !== "production",
		});
	});

	const socialMeta = $derived(getPageSocialMeta(page));

	const umamiId = site.umami.websiteId;
	let openSearch = $state(() => {});

	/** Paths used in nav and static routes (no trailing slash, no .html). */
	const pagefindUrl = $derived(
		page.url.pathname === "/" ? "/" : page.url.pathname.replace(/\/$/, ""),
	);
</script>

<SocialMeta meta={socialMeta} />

<svelte:head>
	{#if umamiId}
		<script defer src={site.umami.src} data-website-id={umamiId}></script>
	{/if}
	<link
		rel="alternate"
		type="application/rss+xml"
		href="/feed.xml"
		title={site.title}
	/>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
	<div class="flex min-h-screen flex-col justify-between font-sans">
		<SiteHeader onSearchClick={() => openSearch()} />
		<main class="mb-auto" data-pagefind-body>
			<span class="sr-only" data-pagefind-meta={`url:${pagefindUrl}`}
			></span>
			{@render children()}
		</main>
		<SiteFooter />
	</div>
</div>

<PagefindSearch registerOpen={(fn) => (openSearch = fn)} />
