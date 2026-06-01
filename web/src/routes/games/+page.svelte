<script lang="ts">
	import GameCard from '$lib/components/GameCard.svelte';
	import { site } from '$lib/config/site';
	import { games } from '$lib/content/games';
</script>

<svelte:head>
	<title>Games | {site.title}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pb-8 pt-6 md:space-y-5">
		<h1
			class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
		>
			Games
		</h1>
		<p class="text-lg leading-7 text-gray-500 dark:text-gray-400">
			Games I've built with Rat Race Studio
		</p>
	</div>
	<div class="container py-12">
		<div class="-m-4 flex flex-wrap">
			{#each games as game}
				<GameCard {game} />
			{/each}
		</div>
	</div>
</div>
