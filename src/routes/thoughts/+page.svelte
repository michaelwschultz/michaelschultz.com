<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import PostListItem from '$lib/components/PostListItem.svelte';
	import { site } from '$lib/config/site';
	import { getPublishedPosts, getTagCounts, POSTS_PER_PAGE } from '$lib/content/posts';

	const posts = getPublishedPosts();
	const pageNumber = 1;
	const displayPosts = posts.slice(0, POSTS_PER_PAGE);
	const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;
	const tagCounts = getTagCounts();
	const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
</script>

<svelte:head>
	<title>Thoughts | {site.title}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<h1
			class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
		>
			All Posts
		</h1>
	</div>
	<div class="flex sm:space-x-24">
		<div class="w-full">
			<ul class="divide-y divide-gray-200 dark:divide-gray-700">
				{#each displayPosts as post (post.slug)}
					<PostListItem {post} />
				{/each}
			</ul>
			{#if totalPages > 1}
				<Pagination basePath="thoughts" currentPage={pageNumber} {totalPages} />
			{/if}
		</div>
		<div class="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
			<div class="px-6 py-4">
				{#each sortedTags as tag}
					<a
						href="/thoughts/tags/{tag}"
						class="mr-4 mt-2 inline-block font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
					>
						{tag} ({tagCounts[tag]})
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
