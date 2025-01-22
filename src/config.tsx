import { BlueskyIcon } from "@/components/icons/bluesky";
import { GithubIcon } from "@/components/icons/github";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { TwitchIcon } from "@/components/icons/twitch";
import { YouTubeIcon } from "@/components/icons/youtube";
import type React from "react";

export type Image = {
	src: string;
	alt?: string;
	caption?: string;
};

export type Social = {
	platform: string;
	link: string;
	icon: React.ReactNode;
};

export type Category = {
	title: string;
	page: string | undefined;
	href: string;
};

export type Meta = {
	title: string;
	description: string;
	image: Image;
};

export type SiteConfig = {
	meta: Meta;
	name: string;
	headshot: string;
	title: string;
	description: string;
	socials: Array<Social>;
	categories: Array<Category>;
};

export const CONFIG: SiteConfig = {
	meta: {
		title: "Michael Schultz",
		description: "I'm a design engineer trying to make things a little better.",
		image: {
			src: "/headshot.jpg",
			alt: "Michael Schultz",
		},
	},
	name: "Michael Schultz",
	headshot: "/headshot.jpg",
	title: "Design Engineer",
	description: `Hey I'm Michael, a software engineer and designer. I love building things that try to solve real problems and hack on things that don't. I've always got a bunch of projects going on. Reach out if you find something here you're interested in and want to know more or talk about over coffee ☕.`,
	socials: [
		{
			platform: "Bluesky",
			link: "https://bsky.app/profile/michaelschultz.com",
			icon: <BlueskyIcon />,
		},
		{
			platform: "GitHub",
			link: "https://github.com/michaelwschultz",
			icon: <GithubIcon />,
		},
		// {
		// 	platform: "Discord",
		// 	link: "https://discord.com/",
		// 	icon: <DiscordIcon />,
		// },
		{
			platform: "YouTube",
			link: "https://www.youtube.com/@MichaelSchultzSF",
			icon: <YouTubeIcon />,
		},
		{
			platform: "Twitch",
			link: "https://www.twitch.tv/idigg",
			icon: <TwitchIcon />,
		},
		{
			platform: "LinkedIn",
			link: "https://www.linkedin.com/in/mikewschultz",
			icon: <LinkedInIcon />,
		},
	],
	categories: [
		{
			title: "All",
			page: undefined,
			href: "/posts",
		},
		{
			title: "Projects",
			page: "projects",
			href: "/posts/projects",
		},
		{
			title: "Lifestyle",
			page: "lifestyle",
			href: "/posts/lifestyle",
		},
	],
};
