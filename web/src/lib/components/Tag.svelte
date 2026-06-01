<script lang="ts">
	import { slug } from 'github-slugger';

	let { text }: { text: string } = $props();
</script>

<a
	href="/thoughts/tags/{slug(text)}"
	class="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
>
	{text}
</a>
