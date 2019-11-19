import React from 'react'
import Head from 'next/head'
import Page from '../components/page'
import Intro from '../components/intro'

const Home = () => (
  <Page>
    <Head>
      <title>Michael Schultz</title>
    </Head>

    <Intro />
  </Page>
)

export default Home
