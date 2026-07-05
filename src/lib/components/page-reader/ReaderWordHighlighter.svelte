<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import {
		clearWordHighlight,
		buildHighlightMap,
		matchedSentenceCount,
		rangeForSentence,
		scrollWordIntoView,
		setWordHighlight,
		articleScrollContainers,
		type HighlightMap
	} from '$lib/page-reader/word-highlight';
	import {
		pageReader,
		getProgress,
		getSentences,
		isCurrentThought,
		unlockScroll
	} from '$lib/page-reader/page-reader.svelte';

	interface Props {
		readerRoot: HTMLElement;
		slug: string;
	}

	let { readerRoot, slug }: Props = $props();

	const BUILD_RETRY_MS = 300;
	const SCROLL_UNLOCK_KEYS = new Set([
		' ',
		'ArrowDown',
		'ArrowUp',
		'End',
		'Home',
		'PageDown',
		'PageUp'
	]);

	const isCurrent = $derived(isCurrentThought(slug));

	$effect(() => {
		if (!isCurrent) {
			clearWordHighlight();
		}
	});

	onMount(() => {
		if (!browser) return;

		let mapRef: HighlightMap | null = null;
		let builtForRef: ReadonlyArray<string> | null = null;
		let lastSentence = -1;
		let pendingSentence = -1;
		let pendingFrames = 0;
		let lastBuild = 0;
		let forceScroll = false;
		let prevScrollLocked = pageReader.scrollLocked;
		let userPointerScroll = false;

		let frame = 0;
		let observer: MutationObserver | null = null;
		let dirtyTimer: ReturnType<typeof setTimeout> | null = null;

		const tick = () => {
			frame = requestAnimationFrame(tick);

			if (!isCurrentThought(slug) || pageReader.state.status !== 'playing') return;

			if (pageReader.scrollLocked && !prevScrollLocked) {
				forceScroll = true;
			}
			prevScrollLocked = pageReader.scrollLocked;

			const sentences = getSentences();
			let map = mapRef;
			if (map && sentences !== builtForRef) {
				map = null;
				mapRef = null;
				builtForRef = null;
				lastSentence = -1;
				pendingSentence = -1;
				pendingFrames = 0;
				clearWordHighlight();
			}

			if (!map) {
				const now = Date.now();
				if (now - lastBuild < BUILD_RETRY_MS) return;
				lastBuild = now;
				if (sentences.length === 0) return;
				const built = buildHighlightMap(readerRoot, sentences);
				if (matchedSentenceCount(built) === 0) return;
				mapRef = built;
				builtForRef = sentences;
				map = built;
			}

			const progress = getProgress();
			if (!progress || !map) return;
			const run = map.sentenceTokens[progress.index];
			if (!run) return;

			let sentenceChanged = false;
			if (progress.index !== lastSentence) {
				if (progress.index === pendingSentence) {
					pendingFrames += 1;
				} else {
					pendingSentence = progress.index;
					pendingFrames = 1;
				}
				if (pendingFrames < 2) return;
				sentenceChanged = true;
			} else {
				pendingSentence = progress.index;
				pendingFrames = 0;
			}

			const shouldFollow = pageReader.scrollLocked && (sentenceChanged || forceScroll);
			if (!sentenceChanged && !forceScroll) return;

			const range = rangeForSentence(map, run);
			if (!range) {
				mapRef = null;
				return;
			}
			lastSentence = progress.index;

			if (sentenceChanged) setWordHighlight(range);
			if (shouldFollow) {
				scrollWordIntoView(range, readerRoot);
				forceScroll = false;
			}
		};

		frame = requestAnimationFrame(tick);

		const Observer = globalThis.MutationObserver;
		if (Observer) {
			observer = new Observer(() => {
				if (dirtyTimer !== null) return;
				dirtyTimer = globalThis.setTimeout(() => {
					dirtyTimer = null;
					mapRef = null;
					builtForRef = null;
					lastSentence = -1;
					pendingSentence = -1;
					pendingFrames = 0;
					lastBuild = 0;
				}, 150);
			});
			observer.observe(readerRoot, { childList: true, subtree: true });
		}

		const scrollers = articleScrollContainers(readerRoot);
		const onUserIntent = () => unlockScroll();
		const onPointerDown = () => {
			userPointerScroll = true;
		};
		const onPointerEnd = () => {
			userPointerScroll = false;
		};
		const onScroll = () => {
			if (userPointerScroll) onUserIntent();
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (SCROLL_UNLOCK_KEYS.has(event.key)) onUserIntent();
		};

		for (const el of scrollers) {
			el.addEventListener('scroll', onScroll, { passive: true });
			el.addEventListener('wheel', onUserIntent, { passive: true });
			el.addEventListener('touchmove', onUserIntent, { passive: true });
			el.addEventListener('keydown', onKeyDown);
			el.addEventListener('pointerdown', onPointerDown);
			el.addEventListener('pointerup', onPointerEnd);
			el.addEventListener('pointercancel', onPointerEnd);
		}

		return () => {
			cancelAnimationFrame(frame);
			observer?.disconnect();
			if (dirtyTimer !== null) globalThis.clearTimeout(dirtyTimer);
			clearWordHighlight();
			for (const el of scrollers) {
				el.removeEventListener('scroll', onScroll);
				el.removeEventListener('wheel', onUserIntent);
				el.removeEventListener('touchmove', onUserIntent);
				el.removeEventListener('keydown', onKeyDown);
				el.removeEventListener('pointerdown', onPointerDown);
				el.removeEventListener('pointerup', onPointerEnd);
				el.removeEventListener('pointercancel', onPointerEnd);
			}
		};
	});
</script>
