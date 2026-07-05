<script lang="ts">
	import MarkdownContent from '$lib/components/MarkdownContent.svelte';

	let { data } = $props();
</script>

<a href="/content-check" class="text-primary-500">← All posts</a>
<h1 class="mt-4 text-2xl font-bold">{data.post.title}</h1>
<article class="prose mt-8 max-w-none dark:prose-invert">
	<MarkdownContent content={data.post.body} />
</article>
