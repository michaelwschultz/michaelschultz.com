import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { slug } from 'github-slugger'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import { escape } from 'pliny/utils/htmlEscaper.js'
import { allThoughts } from '../.contentlayer/generated/index.mjs'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import siteMetadata from '../data/siteMetadata.js'

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/thoughts/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/thoughts/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post?.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/thoughts</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allThoughts, page = 'feed.xml') {
  const publishPosts = allThoughts.filter((post) => post.draft !== true)
  // RSS for thoughts post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts))
    writeFileSync(`./public/${page}`, rss)
  }

  if (publishPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allThoughts.filter((post) =>
        post.tags.map((t) => slug(t)).includes(tag)
      )
      const rss = generateRss(config, filteredPosts, `tags/${tag}/${page}`)
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, page), rss)
    }
  }
}

const rss = () => {
  generateRSS(siteMetadata, allThoughts)
  console.log('RSS feed generated...')
}
export default rss
