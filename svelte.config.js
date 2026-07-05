import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*'],
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
