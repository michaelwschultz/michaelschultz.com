import { writeFileSync } from "node:fs";
import path from "node:path";
import {
	type ComputedFields,
	defineDocumentType,
	makeSource,
} from "contentlayer/source-files";
import { slug } from "github-slugger";
import {
	extractTocHeadings,
	remarkCodeTitles,
	remarkImgToJsx,
} from "pliny/mdx-plugins/index.js";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCitation from "rehype-citation";
import rehypeKatex from "rehype-katex";
import rehypePresetMinify from "rehype-preset-minify";
import rehypePrismPlus from "rehype-prism-plus";
// Rehype packages
import rehypeSlug from "rehype-slug";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import siteMetadata from "./data/siteMetadata.mjs";

const root = process.cwd();
// const isProduction = process.env.NODE_ENV === "production";

const computedFields: ComputedFields = {
	readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
	slug: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
	},
	path: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath,
	},
	filePath: {
		type: "string",
		resolve: (doc) => doc._raw.sourceFilePath,
	},
	toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

/**
 * Count the occurrences of all tags across thoughts posts and write to json file
 */
function createTagCount(allThoughts) {
	const tagCount: Record<string, number> = {};
	const filteredPosts = allThoughts.filter((post) => post.draft !== true);

	for (const file of filteredPosts) {
		if (file.tags) {
			for (const tag of file.tags) {
				const formattedTag = slug(tag);
				if (formattedTag in tagCount) {
					tagCount[formattedTag] += 1;
				} else {
					tagCount[formattedTag] = 1;
				}
			}
		}
	}
	writeFileSync("./app/tag-data.json", JSON.stringify(tagCount));
}

function createSearchIndex(allThoughts) {
	if (
		siteMetadata?.search?.provider === "kbar" &&
		siteMetadata.search.kbarConfig.searchDocumentsPath
	) {
		writeFileSync(
			`public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
			JSON.stringify(allCoreContent(sortPosts(allThoughts))),
		);
		console.log("Local search index generated...");
	}
}

export const Thoughts = defineDocumentType(() => ({
	name: "Thoughts",
	filePathPattern: "thoughts/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		date: { type: "date", required: true },
		tags: { type: "list", of: { type: "string" }, default: [] },
		lastmod: { type: "date" },
		draft: { type: "boolean" },
		summary: { type: "string" },
		images: { type: "json" },
		authors: { type: "list", of: { type: "string" } },
		layout: { type: "string" },
		bibliography: { type: "string" },
		canonicalUrl: { type: "string" },
	},
	computedFields: {
		...computedFields,
		structuredData: {
			type: "json",
			resolve: (doc) => ({
				"@context": "https://schema.org",
				"@type": "Thought",
				headline: doc.title,
				datePublished: doc.date,
				dateModified: doc.lastmod ?? doc.date,
				description: doc.summary,
				image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
				url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
			}),
		},
	},
}));

export const Authors = defineDocumentType(() => ({
	name: "Authors",
	filePathPattern: "authors/**/*.mdx",
	contentType: "mdx",
	fields: {
		name: { type: "string", required: true },
		avatar: { type: "string" },
		occupation: { type: "string" },
		company: { type: "string" },
		email: { type: "string" },
		bluesky: { type: "string" },
		linkedin: { type: "string" },
		github: { type: "string" },
		layout: { type: "string" },
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: "data",
	documentTypes: [Thoughts, Authors],
	mdx: {
		cwd: process.cwd(),
		remarkPlugins: [
			// remarkExtractFrontmatter,
			remarkGfm,
			remarkCodeTitles,
			remarkMath,
			remarkImgToJsx,
		],
		rehypePlugins: [
			rehypeSlug,
			rehypeAutolinkHeadings,
			rehypeKatex,
			[rehypeCitation, { path: path.join(root, "data") }],
			[rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
			rehypePresetMinify,
		],
	},
	onSuccess: async (importData) => {
		const { allThoughts } = await importData();
		createTagCount(allThoughts);
		createSearchIndex(allThoughts);
	},
});
