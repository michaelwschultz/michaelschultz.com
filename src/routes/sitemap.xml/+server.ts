import { site } from '$lib/config/site';
import { getPublishedPosts } from '$lib/content/posts';

export const prerender = true;

export function GET() {
	const staticRoutes = ['', 'thoughts', 'work', 'games', 'thoughts/latest', 'thoughts/tags'];
	const today = new Date().toISOString().split('T')[0];

	const urls = [
		...staticRoutes.map(
			(route) => `
  <url>
    <loc>${site.siteUrl}/${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`
		),
		...getPublishedPosts().map(
			(post) => `
  <url>
    <loc>${site.siteUrl}/thoughts/${post.slug}</loc>
    <lastmod>${(post.lastmod ?? post.date).split('T')[0]}</lastmod>
  </url>`
		)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
