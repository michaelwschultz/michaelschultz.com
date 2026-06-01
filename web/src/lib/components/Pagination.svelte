<script lang="ts">
	let {
		basePath,
		currentPage,
		totalPages
	}: {
		basePath: string;
		currentPage: number;
		totalPages: number;
	} = $props();

	const prevPage = $derived(currentPage > 1);
	const nextPage = $derived(currentPage < totalPages);
	const prevHref = $derived(
		currentPage - 1 === 1 ? `/${basePath}` : `/${basePath}/page/${currentPage - 1}`
	);
	const nextHref = $derived(`/${basePath}/page/${currentPage + 1}`);
</script>

<div class="space-y-2 pb-8 pt-6 md:space-y-5">
	<nav class="flex justify-between">
		{#if prevPage}
			<a href={prevHref} rel="prev">Previous</a>
		{:else}
			<span class="opacity-50">Previous</span>
		{/if}
		<span>{currentPage} of {totalPages}</span>
		{#if nextPage}
			<a href={nextHref} rel="next">Next</a>
		{:else}
			<span class="opacity-50">Next</span>
		{/if}
	</nav>
</div>
