<script lang="ts">
	import { Info } from '@lucide/svelte';
	import {
		PLAYBACK_INFO_TEXT,
		STANDARD_READER_LABEL,
		STANDARD_READER_URL,
		createPlaybackInfoTooltipId
	} from '$lib/page-reader/playback-info';

	const HIDE_DELAY_MS = 120;

	let {
		class: className = '',
		iconClass = 'h-4 w-4'
	}: {
		class?: string;
		iconClass?: string;
	} = $props();

	const tooltipId = createPlaybackInfoTooltipId();

	let visible = $state(false);
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	function show(): void {
		if (hideTimer !== null) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}
		visible = true;
	}

	function hideSoon(): void {
		if (hideTimer !== null) clearTimeout(hideTimer);
		hideTimer = setTimeout(() => {
			visible = false;
			hideTimer = null;
		}, HIDE_DELAY_MS);
	}

	function onFocusOut(event: FocusEvent): void {
		const next = event.relatedTarget;
		if (next instanceof Node && event.currentTarget instanceof Node && event.currentTarget.contains(next)) {
			return;
		}
		hideSoon();
	}
</script>

<span
	class="relative inline-flex {className}"
	onfocusin={show}
	onfocusout={onFocusOut}
>
	<button
		type="button"
		class="cursor-pointer rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
		aria-label="How listening works"
		aria-describedby={tooltipId}
		onmouseenter={show}
		onmouseleave={hideSoon}
	>
		<Info class={iconClass} aria-hidden="true" />
	</button>
	<!-- pb-2 bridges the gap so the pointer can reach the tooltip without closing. -->
	<div
		id={tooltipId}
		role="tooltip"
		class="absolute bottom-full left-1/2 z-10 w-64 -translate-x-1/2 pb-2"
		onmouseenter={show}
		onmouseleave={hideSoon}
	>
		<div
			class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs leading-relaxed text-gray-700 shadow-lg transition-opacity dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 {visible
				? 'pointer-events-auto opacity-100'
				: 'pointer-events-none opacity-0'}"
		>
			{PLAYBACK_INFO_TEXT}
			<a
				href={STANDARD_READER_URL}
				class="text-primary-600 hover:underline dark:text-primary-400"
				target="_blank"
				rel="noopener noreferrer"
			>
				{STANDARD_READER_LABEL}
			</a>.
		</div>
	</div>
</span>
