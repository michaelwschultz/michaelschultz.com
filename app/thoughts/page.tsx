import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { allThoughts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 5

export const metadata: Metadata = genPageMetadata({ title: 'Thoughts' })

export default function ThoughtPage() {
  const posts = allCoreContent(sortPosts(allThoughts))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
