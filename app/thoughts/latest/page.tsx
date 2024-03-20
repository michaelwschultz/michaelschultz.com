import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allThoughts } from 'contentlayer/generated'
import Latest from './Latest'

export default async function Page() {
  const sortedPosts = sortPosts(allThoughts)
  const posts = allCoreContent(sortedPosts)
  return <Latest posts={posts} />
}
