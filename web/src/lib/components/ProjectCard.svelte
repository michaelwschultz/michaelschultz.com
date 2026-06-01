<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		href,
		buttonText,
		buttonColor = 'bg-primary-600 hover:bg-primary-700',
		children
	}: {
		title: string;
		href?: string;
		buttonText: string;
		buttonColor?: string;
		children: Snippet;
	} = $props();
</script>

<div class="project-card-blur relative w-full md:w-1/2 md:max-w-[348px] xl:w-1/3 xl:max-w-[330px]">
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
