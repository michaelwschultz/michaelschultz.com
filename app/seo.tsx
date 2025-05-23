import type { Metadata } from "next";
import siteMetadata from "@/data/siteMetadata.mjs";

interface PageSEOProps {
	title: string;
	description?: string;
	image?: string;
	[key: string]: unknown;
}

export function genPageMetadata({
	title,
	description,
	image,
	...rest
}: PageSEOProps): Metadata {
	return {
		title,
		openGraph: {
			title: `${title} | ${siteMetadata.title}`,
			description: description ?? siteMetadata.description,
			url: "./",
			siteName: siteMetadata.title,
			images: image ? [image] : [siteMetadata.socialBanner],
			locale: "en_US",
			type: "website",
		},
		twitter: {
			title: `${title} | ${siteMetadata.title}`,
			card: "summary_large_image",
			images: image ? [image] : [siteMetadata.socialBanner],
		},
		...rest,
	};
}
