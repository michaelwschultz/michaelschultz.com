"use client";

import { ThemeProvider } from "next-themes";
import siteMetadata from "@/data/siteMetadata.mjs";

export function ThemeProviders({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
			{children}
		</ThemeProvider>
	);
}
