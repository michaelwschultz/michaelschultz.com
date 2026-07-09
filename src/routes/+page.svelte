<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import PostListItem from '$lib/components/PostListItem.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { site } from '$lib/config/site';
	import { getPublishedPosts } from '$lib/content/posts';

	const posts = getPublishedPosts().slice(0, 2);
	const MAX_DISPLAY = 2;
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<div class="relative overflow-x-clip">
	<div
		class="absolute -left-60 top-20 h-[380px] w-[380px] animate-blob rounded-full bg-[#E2EFB0] opacity-5 blur-3xl"
	></div>
	<div
		class="absolute -right-20 top-60 h-[380px] w-[380px] animate-blob rounded-full bg-[#B9FF46] opacity-5 blur-3xl"
	></div>

	<Hero />

	<div class="flex flex-wrap gap-4 pt-24">
		<ProjectCard
			title="Light The Night ✨"
			href="https://ratracestudio.itch.io/light-the-night"
			buttonText="Play Game"
			buttonColor="bg-[#0f175a] hover:bg-[#141c64]"
		>
			<p>
				A modern take on the one-button infinite runner. Travel across a lively pond while
				collecting more light to hold back the encroaching night.
			</p>
			<p class="pt-4">If nothing else, check it out for the good vibes.</p>
		</ProjectCard>
		<ProjectCard
			title="Prism Quest 🔮"
			href="https://ratracestudio.itch.io/prism-quest"
			buttonText="Play Game"
			buttonColor="bg-[#6BB0D4] hover:bg-[#8BCEF1]"
		>
			<p>
				Our kaizo inspired platformer built for the 2024 1-Bit game jam where we placed 20th out
				of 108 entries.
			</p>
			<p class="pt-4">Many have tried, few have overcome. Will you?</p>
		</ProjectCard>
		<ProjectCard
			title="Pack Rat 🐭"
			href="https://ratracestudio.itch.io/pack-rat"
			buttonText="Play Game"
			buttonColor="bg-green-800 hover:bg-green-700"
		>
			<p>
				A point-and-click adventure game built for the Cozy Autumn Game Jam 2023.
			</p>
			<p class="pt-4">
				The game was designed and built in 8 days and lots of coffee. This was also the first
				ever game published by
				<a href="https://ratrace.studio" class="text-primary-500">RatRace.studio</a>.
			</p>
		</ProjectCard>
		<ProjectCard
			title="Hemolog 2.0"
			href="https://hemolog.com"
			buttonText="Try Now"
			buttonColor="bg-[#FF1E68] hover:bg-[#FF4D9E]"
		>
			<p>
				A free health tracking tool for people with Hemophilia, rebuilt from the ground up to be
				simple and more insightful than ever.
			</p>
		</ProjectCard>
		<ProjectCard title="(Ph)one Stand" buttonText="Available Soon">
			<p>
				Tired of not having a quality phone stand that rotated nicely with one hand, I decided to
				design my own. Made with strong, recyclable plastics and eco-friendly Jesmonite.
			</p>
		</ProjectCard>
		<ProjectCard title="Time Between The Stars" buttonText="Coming Soon">
			<p>
				Space simulation game influenced by the short story
				<a
					href="https://www.amazon.com/Slow-Between-Stars-Reaches-collection-ebook/dp/B0C4QX2FSF"
					class="text-primary-500"
				>
					Slow Time Between The Stars by John Scalzi
				</a>.
			</p>
		</ProjectCard>
		<ProjectCard title="Toko Roko" buttonText="Coming Soon">
			<p>
				Hand drawn parkour platformer for PC and consoles.
			</p>
			<p class="pt-4">
				This will be the first full-length game from
				<a href="https://ratrace.studio" class="text-primary-500">RatRace.studio</a>, a
				collaboration with
				<a href="https://luketns.com" class="text-primary-500">Luke Schultz</a>.
			</p>
		</ProjectCard>
	</div>

	<div class="divide-y divide-gray-200 pt-20 dark:divide-gray-700">
		<div class="space-y-2 pb-8 pt-6 md:space-y-5">
			<h2 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
				Latest thoughts
			</h2>
		</div>
		<ul class="divide-y divide-gray-200 dark:divide-gray-700">
			{#if posts.length === 0}
				<li class="py-12">No posts found.</li>
			{:else}
				{#each posts as post (post.slug)}
					<PostListItem {post} />
				{/each}
			{/if}
		</ul>
	</div>
	{#if getPublishedPosts().length > MAX_DISPLAY}
		<div class="flex justify-end text-base font-medium leading-6">
			<a
				href="/thoughts"
				class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
			>
				All Posts →
			</a>
		</div>
	{/if}
</div>
