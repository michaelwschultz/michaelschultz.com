<script lang="ts">
	import PostListItem from '$lib/components/PostListItem.svelte';
	import { site } from '$lib/config/site';
	import { getPublishedPosts } from '$lib/content/posts';

	const posts = getPublishedPosts();
</script>

<svelte:head>
	<title>Latest | {site.title}</title>
</svelte:head>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
			Latest
		</h1>
	</div>
	<ul class="divide-y divide-gray-200 dark:divide-gray-700">
		{#each posts as post (post.slug)}
			<PostListItem {post} />
		{/each}
	</ul>
</div>
