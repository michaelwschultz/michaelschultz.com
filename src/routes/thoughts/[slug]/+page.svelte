<script lang="ts">
	import MarkdownContent from "$lib/components/MarkdownContent.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import { site } from "$lib/config/site";
	import { standardSite } from "$lib/config/standard-site";
	import { formatDateLong } from "$lib/utils/format";
	import { generateDocumentLinkTag } from "@ewanc26/svelte-standard-site/verification";

	let { data } = $props();

	const post = $derived(data.post);
	const prev = $derived(data.prev);
	const next = $derived(data.next);
	const documentLinkTag = $derived(
		post.atprotoRkey && standardSite.did
			? generateDocumentLinkTag({
					did: standardSite.did,
					documentRkey: post.atprotoRkey
				})
			: ""
	);
</script>

<svelte:head>
	<title>{post.title} | {site.title}</title>
	<meta name="description" content={post.summary ?? site.description} />
	{#if documentLinkTag}
		{@html documentLinkTag}
	{/if}
</svelte:head>

<article class="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
	<header class="pt-6 xl:pb-6">
		<div class="space-y-1 text-center">
			<h1
				class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
			>
				{post.title}
			</h1>
			<div class="flex flex-wrap justify-center pt-4">
				{#each post.tags as tag}
					<Tag text={tag} />
				{/each}
			</div>
		</div>
	</header>

	<div
		class="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
	>
		<div
			class="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0"
		>
			<div class="prose max-w-none pb-8 pt-10 dark:prose-invert">
				<MarkdownContent content={post.body} />
			</div>
		</div>

		<aside
			class="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700"
		>
			<dl
				class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm xl:block xl:space-y-6"
			>
				<div>
					<dt class="font-medium text-gray-500 dark:text-gray-400">
						Published
					</dt>
					<dd class="mt-1 text-gray-900 dark:text-gray-100">
						<time datetime={post.date}
							>{formatDateLong(post.date, site.locale)}</time
						>
					</dd>
				</div>
				<div>
					<dt class="font-medium text-gray-500 dark:text-gray-400">
						Words
					</dt>
					<dd class="mt-1 text-gray-900 dark:text-gray-100">
						{post.wordCount.toLocaleString(site.locale)}
						{post.wordCount === 1 ? "word" : "words"}
					</dd>
				</div>
				<div>
					<dt class="font-medium text-gray-500 dark:text-gray-400">
						Reading time
					</dt>
					<dd class="mt-1 text-gray-900 dark:text-gray-100">
						{post.readingTime}
					</dd>
				</div>
			</dl>
		</aside>
	</div>

	<footer class="pt-4 xl:pt-8">
		<div
			class="flex flex-col gap-4 text-sm font-medium sm:flex-row sm:justify-between"
		>
			{#if prev}
				<a
					href="/thoughts/{prev.slug}"
					class="text-primary-500 hover:text-primary-600"
				>
					← {prev.title}
				</a>
			{:else}
				<span></span>
			{/if}
			{#if next}
				<a
					href="/thoughts/{next.slug}"
					class="text-primary-500 hover:text-primary-600"
				>
					{next.title} →
				</a>
			{/if}
		</div>
		<div
			class="mt-6 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400"
		>
			<a
				href="{site.siteRepo}/blob/main/src/content/thoughts/{post.slug}.md"
				class="hover:text-primary-500"
			>
				View on GitHub
			</a>
			<a
				href="https://bsky.app/search?q={encodeURIComponent(
					`${site.siteUrl}/thoughts/${post.slug}`,
				)}"
				class="hover:text-primary-500"
			>
				Discuss on Bluesky
			</a>
		</div>
	</footer>
</article>
