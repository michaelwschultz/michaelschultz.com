import { site } from '$lib/config/site';
import { getPublishedPosts, sortPosts } from '$lib/content/posts';

export const prerender = true;

function escapeXml(text: string) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function GET() {
	const posts = sortPosts(getPublishedPosts());
	const items = posts
		.map(
			(post) => `
  <item>
    <guid>${site.siteUrl}/thoughts/${post.slug}</guid>
    <title>${escapeXml(post.title)}</title>
    <link>${site.siteUrl}/thoughts/${post.slug}</link>
    ${post.summary ? `<description>${escapeXml(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${site.email} (${site.author})</author>
    ${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('')}
  </item>`
		)
		.join('');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${site.siteUrl}/thoughts</link>
    <description>${escapeXml(site.description)}</description>
    <language>${site.language}</language>
    <managingEditor>${site.email} (${site.author})</managingEditor>
    <webMaster>${site.email} (${site.author})</webMaster>
    <lastBuildDate>${posts[0] ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
