<script lang="ts">
	import { getPublishedPosts } from '$lib/content/posts';
	const posts = getPublishedPosts();
</script>

<h1 class="text-2xl font-bold">Content check</h1>
<ul class="mt-4 list-disc pl-6">
	{#each posts as post}
		<li>
			<a href="/content-check/{post.slug}">{post.title}</a>
			— {post.date} — tags: {post.tags.join(', ')}
		</li>
	{/each}
</ul>
