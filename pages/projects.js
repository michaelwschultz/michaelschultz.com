import React from 'react'
import Head from 'next/head'
import Page from '../components/page'
import Dribbble from '../components/dribbble'

function Projects() {
  return (
    <Page>
      <Head>
        <title>Michael Schultz</title>
      </Head>
      <Dribbble />
    </Page>
  )
}

export default Projects
