<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import { site } from '$lib/config/site';
	import type { PostListItem } from '$lib/content/types';
	import { formatDate } from '$lib/utils/format';

	let { post }: { post: PostListItem } = $props();
</script>

<li class="py-12">
	<article>
		<div class="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
			<dl>
				<dt class="sr-only">Published on</dt>
				<dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
					<time datetime={post.date}>{formatDate(post.date, site.locale)}</time>
				</dd>
			</dl>
			<div class="space-y-5 xl:col-span-3">
				<div class="space-y-6">
					<div>
						<h2 class="text-2xl font-bold leading-8 tracking-tight">
							<a href="/thoughts/{post.slug}" class="text-gray-900 dark:text-gray-100">
								{post.title}
							</a>
						</h2>
						<div class="flex flex-wrap">
							{#each post.tags as tag}
								<Tag text={tag} />
							{/each}
						</div>
					</div>
					{#if post.summary}
						<div class="prose max-w-none text-gray-500 dark:text-gray-400">
							{post.summary}
						</div>
					{/if}
				</div>
				<div class="text-base font-medium leading-6">
					<a
						href="/thoughts/{post.slug}"
						class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
					>
						Read more →
					</a>
				</div>
			</div>
		</div>
	</article>
</li>
