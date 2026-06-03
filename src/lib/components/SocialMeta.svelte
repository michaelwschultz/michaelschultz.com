<script lang="ts">
	import { site } from '$lib/config/site';
	import { absoluteImageUrl, type SocialMeta } from '$lib/utils/social-meta';

	let { meta }: { meta: SocialMeta } = $props();

	const imageUrl = $derived(absoluteImageUrl(meta.image));
	const isDefaultImage = $derived(meta.image === site.socialBanner);
</script>

<svelte:head>
	<link rel="canonical" href={meta.url} />
	<meta property="og:type" content={meta.type} />
	<meta property="og:site_name" content={site.title} />
	<meta property="og:locale" content={site.locale} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content={meta.title} />
	{#if isDefaultImage}
		<meta property="og:image:width" content="1600" />
		<meta property="og:image:height" content="900" />
	{/if}
	{#if meta.publishedTime}
		<meta property="article:published_time" content={meta.publishedTime} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={meta.title} />
</svelte:head>
