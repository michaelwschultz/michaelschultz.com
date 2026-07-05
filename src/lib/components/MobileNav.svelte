<script lang="ts">
	import { Menu, X } from '@lucide/svelte';
	import { navLinks } from '$lib/config/nav';

	let open = $state(false);

	function toggle() {
		open = !open;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = open ? 'hidden' : '';
		}
	}

	function close() {
		open = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}
</script>

<button type="button" aria-label="Toggle Menu" onclick={toggle} class="sm:hidden">
	<Menu class="h-8 w-8 text-gray-900 dark:text-gray-100" aria-hidden="true" />
</button>

<div
	class="fixed left-0 top-0 z-10 h-full w-full transform bg-white opacity-95 duration-300 ease-in-out dark:bg-gray-950 dark:opacity-[0.98] {open
		? 'translate-x-0'
		: 'pointer-events-none translate-x-full'}"
	aria-hidden={!open}
	inert={!open}
>
	<div class="flex justify-end">
		<button type="button" class="mr-8 mt-11 h-8 w-8" aria-label="Close Menu" onclick={close}>
			<X class="h-8 w-8 text-gray-900 dark:text-gray-100" aria-hidden="true" />
		</button>
	</div>
	<nav class="fixed mt-8 h-full">
		{#each navLinks as link}
			<div class="px-12 py-4">
				<a
					href={link.href}
					class="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
					onclick={close}
				>
					{link.title}
				</a>
			</div>
		{/each}
	</nav>
</div>
