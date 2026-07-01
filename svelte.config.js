import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';

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
		adapter: adapter(),
		prerender: {
			entries: ['*'],
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
