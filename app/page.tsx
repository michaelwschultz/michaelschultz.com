import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allThoughts } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allThoughts)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
