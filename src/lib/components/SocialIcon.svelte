<script lang="ts">
	import { Mail } from '@lucide/svelte';
	import BrandIcon from '$lib/components/icons/BrandIcon.svelte';

	type SocialKind = 'mail' | 'github' | 'bluesky';

	let {
		kind,
		href,
		class: className = 'h-6 w-6'
	}: {
		kind: SocialKind;
		href: string | undefined;
		class?: string;
	} = $props();

	const labels: Record<SocialKind, string> = {
		mail: 'Email',
		github: 'GitHub',
		bluesky: 'Bluesky'
	};

	const label = $derived(labels[kind]);
	const isExternal = $derived(kind !== 'mail');
</script>

{#if href}
	<a
		{href}
		aria-label={label}
		class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
		target={isExternal ? '_blank' : undefined}
		rel={isExternal ? 'noopener noreferrer' : undefined}
	>
		<span class="sr-only">{label}</span>
		{#if kind === 'mail'}
			<Mail class={className} aria-hidden="true" />
		{:else}
			<BrandIcon kind={kind} class="{className} fill-current" />
		{/if}
	</a>
{/if}
