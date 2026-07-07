<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { heroIntroPlainText } from '$lib/content/hero-intro';
	import {
		LINE_HEIGHT,
		OBSTACLE_MIN_WIDTH,
		layoutHeroIntro,
		prepareHeroIntro,
		relativeRectWithinRoot,
		type HeroIntroLayout,
		type PreparedHeroIntro
	} from '$lib/hero/pretext-intro';

	type Props = {
		class?: string;
		heroEl?: HTMLElement | null;
		imageEl?: HTMLImageElement | null;
	};

	let { class: className = '', heroEl = null, imageEl = null }: Props = $props();

	let introRoot = $state<HTMLDivElement | null>(null);
	let prepared = $state<PreparedHeroIntro | null>(null);
	let layout = $state<HeroIntroLayout | null>(null);
	let ready = $state(false);

	let scheduledRaf: number | null = null;
	let lastLayoutWidth = -1;

	function scheduleLayout(): void {
		if (!browser || !prepared || !introRoot) return;
		if (scheduledRaf !== null) return;

		scheduledRaf = requestAnimationFrame(() => {
			scheduledRaf = null;
			renderLayout();
		});
	}

	function renderLayout(): void {
		if (!introRoot || !prepared) return;

		const containerWidth = Math.round(introRoot.clientWidth);
		if (containerWidth <= 0) return;

		const heroWidth = heroEl ? Math.round(heroEl.clientWidth) : 0;
		const useObstacle = heroWidth >= OBSTACLE_MIN_WIDTH && imageEl && heroEl;
		let imageRect = null;

		if (useObstacle) {
			const heroRect = heroEl.getBoundingClientRect();
			const introRect = introRoot.getBoundingClientRect();
			const portraitRect = relativeRectWithinRoot(imageEl, heroEl);

			imageRect = {
				left: Math.round(portraitRect.left - (introRect.left - heroRect.left)),
				top: Math.round(portraitRect.top - (introRect.top - heroRect.top)),
				right: Math.round(portraitRect.right - (introRect.left - heroRect.left)),
				bottom: Math.round(portraitRect.bottom - (introRect.top - heroRect.top))
			};
		}

		const next = layoutHeroIntro(prepared, {
			containerWidth,
			imageRect
		});

		if (
			layout &&
			lastLayoutWidth === containerWidth &&
			layout.bodyHeight === next.bodyHeight &&
			layout.lines.length === next.lines.length
		) {
			return;
		}

		lastLayoutWidth = containerWidth;
		layout = next;
		ready = true;
	}

	onMount(() => {
		if (!browser) return;

		const init = async () => {
			await document.fonts.ready;
			prepared = prepareHeroIntro();
			scheduleLayout();
		};

		void init();

		const onWindowResize = () => scheduleLayout();
		window.addEventListener('resize', onWindowResize);

		return () => {
			window.removeEventListener('resize', onWindowResize);
			if (scheduledRaf !== null) {
				cancelAnimationFrame(scheduledRaf);
			}
		};
	});

	$effect(() => {
		if (!browser || !introRoot || !prepared) return;

		let observedWidth = Math.round(introRoot.clientWidth);

		const observer = new ResizeObserver((entries) => {
			const width = Math.round(entries[0]?.contentRect.width ?? 0);
			if (width === observedWidth) return;
			observedWidth = width;
			scheduleLayout();
		});
		observer.observe(introRoot);

		return () => observer.disconnect();
	});

	$effect(() => {
		if (!browser || !imageEl || !prepared) return;

		const onImageLoad = () => scheduleLayout();
		imageEl.addEventListener('load', onImageLoad);
		if (imageEl.complete) {
			scheduleLayout();
		}

		return () => imageEl.removeEventListener('load', onImageLoad);
	});
</script>

<div bind:this={introRoot} class="hero-intro {className}">
	{#if !ready || !layout}
		<p class="hero-intro-fallback">{heroIntroPlainText}</p>
	{:else}
		<div
			class="hero-intro-body"
			style:min-height="{layout.bodyHeight}px"
			aria-label={heroIntroPlainText}
		>
			{#each layout.lines as line, lineIndex (lineIndex)}
				<div
					class="hero-intro-line"
					style:left="{line.x}px"
					style:top="{lineIndex * LINE_HEIGHT}px"
				>
					{#each line.fragments as fragment, fragmentIndex (`${lineIndex}-${fragmentIndex}`)}
						<span
							class={fragment.className}
							style:margin-left={fragment.leadingGap > 0 ? `${fragment.leadingGap}px` : undefined}
						>
							{fragment.text}
						</span>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.hero-intro {
		position: relative;
		width: 100%;
	}

	.hero-intro-fallback {
		margin: 0;
		color: #042c0e;
	}

	.hero-intro-body {
		position: relative;
		width: 100%;
	}

	.hero-intro-line {
		position: absolute;
		left: 0;
		display: flex;
		align-items: baseline;
		flex-wrap: nowrap;
		width: max-content;
	}

	:global(.hero-frag) {
		display: inline-block;
		white-space: pre;
		font: 400 16px/1 'Space Grotesk', sans-serif;
		color: #042c0e;
		vertical-align: baseline;
	}

	:global(.hero-frag--highlight) {
		font-weight: 600;
		background: color-mix(in srgb, #dbe8a8 55%, transparent);
		padding-inline: 0.2em;
		border-radius: 0.2rem;
	}
</style>
