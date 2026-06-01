<script lang="ts">
	let { data } = $props();
	const PostContent = $derived(data.post.Content);
</script>

<a href="/content-check" class="text-primary-500">← All posts</a>
<h1 class="mt-4 text-2xl font-bold">{data.post.title}</h1>
<article class="prose mt-8 max-w-none dark:prose-invert">
	<PostContent />
</article>
