<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import PostListItem from '$lib/components/PostListItem.svelte';
	import { site } from '$lib/config/site';
	import { getTagCounts } from '$lib/content/posts';

	let { data } = $props();

	const tagCounts = getTagCounts();
	const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
</script>

<svelte:head>
	<title>Thoughts | {site.title}</title>
</svelte:head>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
			All Posts
		</h1>
	</div>
	<div class="flex sm:space-x-24">
		<div class="hidden max-w-[280px] min-w-[280px] flex-wrap sm:flex">
			<div class="px-6 py-4">
				{#each sortedTags as tag}
					<a href="/thoughts/tags/{tag}" class="mr-4 mt-2 inline-block font-bold uppercase">
						{tag} ({tagCounts[tag]})
					</a>
				{/each}
			</div>
		</div>
		<div class="w-full">
			<ul class="divide-y divide-gray-200 dark:divide-gray-700">
				{#each data.displayPosts as post (post.slug)}
					<PostListItem {post} />
				{/each}
			</ul>
			<Pagination basePath="thoughts" currentPage={data.pageNumber} totalPages={data.totalPages} />
		</div>
	</div>
</div>
