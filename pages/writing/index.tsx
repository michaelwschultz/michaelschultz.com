import { NotionRenderer, BlockMapType } from 'react-notion'
import Head from 'next/head'
import Link from 'next/link'
import fetch from 'node-fetch'

const NOTION_BLOG_ID = 'a194e7b2aaab4570827eab514a54562a'

export const getAllPosts = async () => {
  const data: BlockMapType = await fetch(
    `https://notion-api.splitbee.io/v1/page/${NOTION_BLOG_ID}`
  ).then((res) => res.json())

  return {
    props: {
      blockMap: data,
    },
    revalidate: 1,
  }
}

export async function getStaticProps() {
  const posts = await getAllPosts()

  console.log(posts)

  return {
    props: {
      posts,
    },
  }
}

const HomePage = ({ blockMap }) => (
  <div>
    <Head>
      <style>{`body { margin: 0;}`}</style>
      <title>react-notion example</title>
    </Head>
    <NotionRenderer
      blockMap={blockMap}
      fullPage
      hideHeader
      customBlockComponents={{
        page: ({ blockValue, renderComponent }) => (
          <Link href={`/${blockValue.id}`}>{renderComponent()}</Link>
        ),
      }}
    />
  </div>
)

export default HomePage
