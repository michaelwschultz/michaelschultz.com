import "css/prism.css";
import "katex/dist/katex.css";

import { components } from "@/components/MDXComponents";
import { MDXLayoutRenderer } from "pliny/mdx-components";
import {
	sortPosts,
	coreContent,
	allCoreContent,
} from "pliny/utils/contentlayer";
import { allThoughts, allAuthors } from "contentlayer/generated";
import type { Authors, Thoughts } from "contentlayer/generated";
import PostSimple from "@/layouts/PostSimple";
import PostLayout from "@/layouts/PostLayout";
import PostBanner from "@/layouts/PostBanner";
import type { Metadata } from "next";
import siteMetadata from "@/data/siteMetadata.mjs";
import { notFound } from "next/navigation";

const defaultLayout = "PostLayout";
const layouts = {
	PostSimple,
	PostLayout,
	PostBanner,
};

export async function generateMetadata({
	params,
}): Promise<Metadata | undefined> {
	const { slug } = await params;
	const newslug = decodeURI(slug?.join("/"));
	const post = allThoughts.find((p) => p.slug === newslug);
	const authorList = post?.authors || ["default"];
	const authorDetails = authorList.map((author) => {
		const authorResults = allAuthors.find((p) => p.slug === author);
		return coreContent(authorResults as Authors);
	});
	if (!post) {
		return undefined;
	}

	const publishedAt = new Date(post.date).toISOString();
	const modifiedAt = new Date(post.lastmod ?? post.date).toISOString();
	const authors = authorDetails.map((author) => author.name);

	// Generate dynamic ogImage and imageList
	const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}`;
	const ogImages = [ogImageUrl];
	const imageList = [ogImageUrl];

	return {
		title: post.title,
		description: post.summary,
		openGraph: {
			title: post.title,
			description: post.summary,
			siteName: siteMetadata.title,
			locale: "en_US",
			type: "article",
			publishedTime: publishedAt,
			modifiedTime: modifiedAt,
			url: "./",
			images: ogImages,
			authors: authors.length > 0 ? authors : [siteMetadata.author],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.summary,
			images: imageList,
		},
	};
}

export const generateStaticParams = async () => {
	const paths = allThoughts.map((p) => ({ slug: p.slug.split("/") }));

	return paths;
};

export default async function Page({ params }) {
	const { slug } = await params;
	const newslug = decodeURI(slug?.join("/"));
	// Filter out drafts in production
	const sortedCoreContents = allCoreContent(sortPosts(allThoughts));
	const postIndex = sortedCoreContents.findIndex((p) => p.slug === newslug);
	if (postIndex === -1) {
		return notFound();
	}

	const prev = sortedCoreContents[postIndex + 1];
	const next = sortedCoreContents[postIndex - 1];
	const post = allThoughts.find((p) => p.slug === newslug) as Thoughts;
	const authorList = post?.authors || ["default"];
	const authorDetails = authorList.map((author) => {
		const authorResults = allAuthors.find((p) => p.slug === author);
		return coreContent(authorResults as Authors);
	});
	const mainContent = coreContent(post);
	const jsonLd = post.structuredData;
	jsonLd.author = authorDetails.map((author) => {
		return {
			"@type": "Person",
			name: author.name,
		};
	});

	const Layout = layouts[post.layout ?? defaultLayout];

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Layout
				content={mainContent}
				authorDetails={authorDetails}
				next={next}
				prev={prev}
			>
				<MDXLayoutRenderer
					code={post.body.code}
					components={components}
					toc={post.toc}
				/>
			</Layout>
		</>
	);
}
