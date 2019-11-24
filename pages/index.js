import React from 'react'
import Head from 'next/head'
import Page from '../components/page'
import Intro from '../components/intro'
import Music from '../components/music'
import Friends from '../components/friends'

const Home = () => (
  <Page>
    <Head>
      <title>Michael Schultz</title>
    </Head>

    <Intro />
    <Music />
    <Friends />
  </Page>
)

export default Home
