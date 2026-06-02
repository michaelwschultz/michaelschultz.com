import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.svx'],
			remarkPlugins: [],
			rehypePlugins: []
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
