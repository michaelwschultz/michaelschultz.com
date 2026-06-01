export const site = {
	title: 'Michael Schultz',
	author: 'Michael Schultz',
	headerTitle: 'Michael Schultz',
	description: 'Michael Schultz | software and design',
	language: 'en-us',
	defaultTheme: 'dark' as const,
	siteUrl: 'https://michaelschultz.com',
	siteRepo: 'https://github.com/michaelwschultz/michaelschultz.com',
	siteLogo: '/static/images/logo.png',
	socialBanner: '/static/images/michael-schultz-social.jpg',
	email: 'hi@michaelschultz.com',
	github: 'https://github.com/michaelwschultz',
	bluesky: 'https://bsky.app/profile/michaelschultz.com',
	linkedin: 'https://www.linkedin.com/in/mikewschultz/',
	locale: 'en-US',
	umami: {
		websiteId: import.meta.env.PUBLIC_UMAMI_ID ?? '',
		src: 'https://cloud.umami.is/script.js'
	}
} as const;
