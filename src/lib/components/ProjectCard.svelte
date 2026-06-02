<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		href,
		buttonText,
		buttonColor = 'bg-primary-600 hover:bg-primary-700',
		accentColor,
		children
	}: {
		title: string;
		href?: string;
		buttonText: string;
		buttonColor?: string;
		/** Border tint; defaults from `buttonColor` when it includes a hex or known Tailwind token. */
		accentColor?: string;
		children: Snippet;
	} = $props();

	const borderAccent = $derived(
		accentColor ?? (href ? accentFromButtonColor(buttonColor) : '#6b7280')
	);

	/** Top-weighted tint on the glass border (matches legacy Next project cards). */
	const borderBackground = $derived(
		`linear-gradient(180deg, color-mix(in srgb, ${borderAccent} 50%, transparent) 0%, rgba(255, 255, 255, 0.01) 45%, rgba(255, 255, 255, 0.01) 100%)`
	);

	function accentFromButtonColor(classes: string): string {
		const hex = classes.match(/#([0-9a-fA-F]{3,8})/)?.[0];
		if (hex) return hex;

		if (classes.includes('green-800')) return '#166534';
		if (classes.includes('primary-600') || classes.includes('primary-700')) return '#16a34a';

		return '#6b7280';
	}
</script>

<div
	class="project-card-blur relative w-full md:w-1/2 md:max-w-[348px] xl:w-1/3 xl:max-w-[330px]"
	style:--project-card-accent={borderAccent}
	style:--project-card-border-bg={borderBackground}
>
	<div class="relative flex h-full flex-col justify-between p-6">
		<div class="pb-8">
			<h2 class="mb-3 text-2xl font-bold leading-8 tracking-tight">
				{#if href}
					<a href={href} class="hover:underline">{title}</a>
				{:else}
					{title}
				{/if}
			</h2>
			<div class="prose max-w-none text-gray-500 dark:text-gray-400">
				{@render children()}
			</div>
		</div>
		{#if href}
			<a
				href={href}
				class="inline-block rounded px-4 py-2 text-center text-sm font-medium text-white {buttonColor}"
			>
				{buttonText}
			</a>
		{:else}
			<span
				class="inline-block rounded bg-gray-600 px-4 py-2 text-center text-sm font-medium text-white"
			>
				{buttonText}
			</span>
		{/if}
	</div>
</div>
