"use client";

import { Comments as CommentsComponent } from "pliny/comments";
import { useState } from "react";
import siteMetadata from "@/data/siteMetadata.mjs";

export default function Comments({ slug }: { slug: string }) {
	const [loadComments, setLoadComments] = useState(false);
	return (
		<>
			{!loadComments && (
				<button onClick={() => setLoadComments(true)} type="button">
					Load Comments
				</button>
			)}
			{siteMetadata.comments && loadComments && (
				<CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
			)}
		</>
	);
}
