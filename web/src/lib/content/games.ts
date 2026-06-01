export type Game = {
	title: string;
	description: string;
	href?: string;
	imgSrc?: string;
	buttonText?: string;
};

export const games: Game[] = [
	{
		title: 'Light The Night ✨',
		description: 'A modern take on the infinite runner for web and mobile.',
		imgSrc: '/static/images/games/light-the-night-cover-art.png',
		href: 'https://ratracestudio.itch.io/light-the-night',
		buttonText: 'Play on Itch.io'
	},
	{
		title: 'Prism Quest 🔮',
		description:
			'Our kaizo inspired platformer built for the 2024 1-Bit game jam where we placed 20th out of 108 entries.',
		imgSrc: '/static/images/games/prism-quest-cover-art.jpg',
		href: 'https://ratracestudio.itch.io/prism-quest',
		buttonText: 'Play on Itch.io'
	},
	{
		title: 'Pack Rat 🐭',
		description: `A point-and-click adventure game built for the Cozy Autumn Game Jam 2023. The game was designed and built in 8 days and lots of coffee.

This was also the first ever game published by Rat Race Studio.`,
		imgSrc: '/static/images/games/pack-rat-cover-art.png',
		href: 'https://ratracestudio.itch.io/pack-rat',
		buttonText: 'Play on Itch.io'
	},
	{
		title: 'Toko Roko',
		description: `Currently in development hand drawn parkour platformer for PC and consoles. Coming soon.

We stream development on Twitch every Tuesday, Thursday, and Sunday at 1pm EST / 10am PST.`,
		imgSrc: '/static/images/games/toko-roko-cover-art.jpg',
		href: 'https://twitch.tv/ratracestudio',
		buttonText: 'Follow on Twitch'
	}
];
