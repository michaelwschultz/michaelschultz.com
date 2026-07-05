/// <reference types="@sveltejs/kit" />

declare namespace svelteHTML {
	interface IntrinsicElements {
		'pagefind-config': import('svelte/elements').HTMLAttributes<HTMLElement> & {
			'base-url'?: string;
		};
		'pagefind-modal': import('svelte/elements').HTMLAttributes<HTMLElement> & {
			'reset-on-close'?: boolean;
			instance?: string;
		};
	}
}
