<script lang="ts">
	import { onMount } from 'svelte';
	import type { BlueskyStatus } from '$lib/bluesky/status';

	let status = $state<BlueskyStatus | null>(null);

	onMount(async () => {
		try {
			const response = await fetch('/api/status');
			if (!response.ok) return;

			const data = (await response.json()) as { status: BlueskyStatus | null };
			if (data.status) {
				status = data.status;
			}
		} catch {
			// Status is optional; fail silently.
		}
	});
</script>

{#if status}
	<p class="fade-in-down mt-4 text-sm text-[#042C0E] opacity-0">
		<span class="font-semibold">Now:</span>
		{status.text}
	</p>
{/if}
