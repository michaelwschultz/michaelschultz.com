<script lang="ts">
	import { Search } from '@lucide/svelte';
	import { navLinks } from '$lib/config/nav';
	import { site } from '$lib/config/site';
	import MsLogo from '$lib/components/icons/MsLogo.svelte';
	import MobileNav from './MobileNav.svelte';

	let { onSearchClick = () => {} }: { onSearchClick?: () => void } = $props();

	const links = navLinks.filter((l) => l.href !== '/');
</script>

<header class="flex items-center justify-between py-10">
	<a href="/" aria-label={site.headerTitle} class="flex items-center text-gray-900 dark:text-gray-100">
		<MsLogo class="mr-3 h-7 w-7 shrink-0" />
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
			<Search class="h-6 w-6" aria-hidden="true" />
		</button>
		<MobileNav />
	</div>
</header>
