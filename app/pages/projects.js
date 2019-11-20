import React from 'react'
import Head from 'next/head'
import Page from '../components/page'
import DribbblePosts from '../components/dribbble_posts'

function Projects() {
  return (
    <Page>
      <Head>
        <title>Michael Schultz</title>
      </Head>
      <DribbblePosts />
    </Page>
  )
}

export default Projects
