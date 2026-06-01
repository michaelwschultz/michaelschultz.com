<script lang="ts">
	import type { Game } from '$lib/content/games';

	let { game }: { game: Game } = $props();
</script>

<div class="max-w-[544px] p-4 md:w-1/2">
	<div
		class="overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 {game.imgSrc
			? 'h-full'
			: ''}"
	>
		{#if game.imgSrc}
			{#if game.href}
				<a href={game.href} aria-label="Link to {game.title}">
					<img
						src={game.imgSrc}
						alt={game.title}
						class="h-72 w-full object-cover object-center"
					/>
				</a>
			{:else}
				<img src={game.imgSrc} alt={game.title} class="h-72 w-full object-cover object-center" />
			{/if}
		{/if}
		<div class="p-6">
			<h2 class="mb-3 text-2xl font-bold leading-8 tracking-tight">
				{#if game.href}
					<a href={game.href} class="hover:underline">{game.title}</a>
				{:else}
					{game.title}
				{/if}
			</h2>
			<p class="prose mb-3 max-w-none whitespace-pre-wrap text-gray-500 dark:text-gray-400">
				{game.description}
			</p>
			{#if game.href}
				<a
					href={game.href}
					class="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
				>
					{game.buttonText ?? 'Learn more'} →
				</a>
			{/if}
		</div>
	</div>
</div>
