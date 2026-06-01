<script lang="ts">
	import { navLinks } from '$lib/config/nav';
	import { site } from '$lib/config/site';
	import MobileNav from './MobileNav.svelte';

	let { onSearchClick = () => {} }: { onSearchClick?: () => void } = $props();

	const links = navLinks.filter((l) => l.href !== '/');
</script>

<header class="flex items-center justify-between py-10">
	<a href="/" aria-label={site.headerTitle} class="flex items-center">
		<img src="/static/images/ms.svg" alt="logo" width="31" height="24" class="mr-3" />
	</a>
	<div class="flex items-center space-x-4 leading-5 sm:space-x-6">
		{#each links as link}
			<a
				href={link.href}
				class="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
			>
				{link.title}
			</a>
		{/each}
		<button
			type="button"
			class="text-gray-900 dark:text-gray-100"
			aria-label="Search"
			onclick={onSearchClick}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<title>Search</title>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		</button>
		<MobileNav />
	</div>
</header>
