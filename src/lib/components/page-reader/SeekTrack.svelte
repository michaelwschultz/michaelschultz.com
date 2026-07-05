<script lang="ts">
	const ARROW_SECONDS = 5;

	interface Props {
		fraction: number;
		disabled: boolean;
		durationSeconds: number;
		currentSeconds: number;
		onPreview: (seconds: number) => void;
		onCommit: (seconds: number) => void;
	}

	let {
		fraction,
		disabled,
		durationSeconds,
		currentSeconds,
		onPreview,
		onCommit
	}: Props = $props();

	let trackEl: HTMLDivElement | undefined = $state();
	let dragging = $state(false);

	function secondsFromClientX(clientX: number): number {
		if (!trackEl || durationSeconds <= 0) return 0;
		const rect = trackEl.getBoundingClientRect();
		const ratio =
			rect.width > 0 ? Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) : 0;
		return ratio * durationSeconds;
	}

	function onPointerDown(event: PointerEvent) {
		if (disabled) return;
		dragging = true;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		onPreview(secondsFromClientX(event.clientX));
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging) return;
		onPreview(secondsFromClientX(event.clientX));
	}

	function endDrag(event: PointerEvent) {
		if (!dragging) return;
		dragging = false;
		onCommit(secondsFromClientX(event.clientX));
	}

	function onKeyDown(event: KeyboardEvent) {
		if (disabled) return;
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			onCommit(Math.max(0, currentSeconds - ARROW_SECONDS));
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			onCommit(Math.min(durationSeconds, currentSeconds + ARROW_SECONDS));
		}
	}

	const pct = $derived(Math.min(1, Math.max(0, fraction)) * 100);
</script>

<div
	bind:this={trackEl}
	class="relative w-full touch-none pt-2 pb-1 {disabled
		? 'cursor-default'
		: 'cursor-pointer'}"
	role="slider"
	tabindex={disabled ? -1 : 0}
	aria-valuemin={0}
	aria-valuemax={durationSeconds}
	aria-valuenow={currentSeconds}
	aria-label="Playback position"
	aria-disabled={disabled}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={endDrag}
	onpointercancel={endDrag}
	onkeydown={onKeyDown}
>
	<div
		class="relative h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 {disabled
			? 'opacity-60'
			: ''}"
	>
		<div
			class="absolute top-0 left-0 h-full rounded-full bg-primary-500 transition-[width] duration-150"
			style:width="{pct}%"
		></div>
	</div>
</div>
