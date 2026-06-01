<script lang="ts">
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import { site } from '$lib/config/site';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="mt-16 flex flex-col items-center">
		<div class="mb-3 flex space-x-4">
			<SocialIcon kind="bluesky" href={site.bluesky} />
			<SocialIcon kind="mail" href={`mailto:${site.email}`} />
			<SocialIcon kind="github" href={site.github} />
			<SocialIcon kind="linkedin" href={site.linkedin} />
		</div>
		<div class="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
			<span>{site.author}</span>
			<span>•</span>
			<span>© {year}</span>
		</div>
		<div class="mb-8 text-sm text-gray-500 dark:text-gray-400">
			<a href={site.siteRepo}>Source</a>
		</div>
	</div>
</footer>
