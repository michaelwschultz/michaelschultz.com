<script lang="ts">
	import PostListItem from '$lib/components/PostListItem.svelte';
	import { site } from '$lib/config/site';
	import { getTagCounts } from '$lib/content/posts';

	let { data } = $props();
	const tagCounts = getTagCounts();
	const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
</script>

<svelte:head>
	<title>{data.title} | {site.title}</title>
</svelte:head>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
			{data.title}
		</h1>
	</div>
	<div class="flex sm:space-x-24">
		<ul class="divide-y divide-gray-200 dark:divide-gray-700">
			{#each data.posts as post (post.slug)}
				<PostListItem {post} />
			{/each}
		</ul>
		<div class="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
			<div class="px-6 py-4">
				{#each sortedTags as tag}
					{@const isCurrent = tag === data.tag}
					<a
						href="/thoughts/tags/{tag}"
						aria-current={isCurrent ? 'page' : undefined}
						class="mr-4 mt-2 inline-block font-bold uppercase {isCurrent
							? 'text-primary-500 dark:text-primary-400'
							: 'text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400'}"
					>
						{tag} ({tagCounts[tag]})
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

