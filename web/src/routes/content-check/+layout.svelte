<script lang="ts">
	let { children } = $props();
</script>

<!-- Debug routes: keep out of Pagefind index -->
<div data-pagefind-ignore="all">
	{@render children()}
</div>
