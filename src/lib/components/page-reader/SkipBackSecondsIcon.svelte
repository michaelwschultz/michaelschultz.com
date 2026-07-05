<script lang="ts">
	let {
		seconds = 15,
		class: className = 'h-5 w-5'
	}: {
		seconds?: number;
		class?: string;
	} = $props();
</script>

<!-- Lucide-style counter-clockwise arc with seconds label (no bundled skip-N icon). -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
	<path d="M3 3v5h5" />
	<text
		x="12"
		y="14.5"
		text-anchor="middle"
		font-size="7.5"
		font-weight="700"
		fill="currentColor"
		stroke="none"
		font-family="ui-sans-serif, system-ui, sans-serif"
	>
		{seconds}
	</text>
</svg>
