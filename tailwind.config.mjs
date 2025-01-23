import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
	theme: {
		transparent: "transparent",
		current: "currentColor",
		extend: {
			colors: {
				primary: "#0E0E0E",
				secondary: "#ECECEC",
				secondaryDark: "#D8D8D8",
				secondaryDarker: "#6C7072",
				socialBorder: "#4B4E4F",
				hoverBackground: "#1C1C1C",
			},
		},
	},
	plugins: [typography],
};
