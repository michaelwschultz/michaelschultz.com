<script lang="ts">
	import { renderMarkdown } from '$lib/utils/markdown';

	interface Props {
		content: string;
	}

	let { content }: Props = $props();

	const html = $derived(renderMarkdown(content));
</script>

{@html html}
