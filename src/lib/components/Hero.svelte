<script lang="ts">
	import HeroIntro from '$lib/components/HeroIntro.svelte';
	import StatusLine from '$lib/components/StatusLine.svelte';

	let heroEl = $state<HTMLDivElement | null>(null);
	let portraitEl = $state<HTMLImageElement | null>(null);
</script>

<div
	class="relative h-[480px] overflow-hidden rounded-md bg-[#6D962A] p-6 md:h-[520px] md:p-10"
	bind:this={heroEl}
>
	<h1
		class="relative z-0 font-hero fade-in-down-headline text-5xl font-bold uppercase tracking-tighter text-[#DBE8A8] opacity-0 md:text-[114px] lg:leading-[114px] xl:text-[168px] xl:leading-[168px]"
	>
		Michael Schultz
	</h1>
	<img
		bind:this={portraitEl}
		src="/static/images/michael_fullbody.png"
		alt="Michael Schultz"
		width="305"
		height="606"
		class="image-animate-up-on-load pointer-events-none absolute -bottom-32 left-1/2 z-10 w-[180px] -translate-x-1/8 opacity-0 drop-shadow-2xl sm:w-[240px] md:w-[305px]"
	/>
	<div class="hero-stage relative z-20 max-w-[min(100%,30rem)] pr-20 pt-10 md:max-w-[300px] md:pt-24">
		<HeroIntro class="fade-in-down opacity-0" {heroEl} imageEl={portraitEl} />
		<StatusLine />
	</div>
</div>
