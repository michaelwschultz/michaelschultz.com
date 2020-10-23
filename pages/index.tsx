import React from 'react'
import Head from 'next/head'

import DesignThoughts from '../components/designThoughts'
import Friends from '../components/friends'
import Intro from '../components/intro'
import Nav from '../components/nav'
import Page from '../components/page'
import Projects from '../components/projects'
import Soundcloud from '../components/soundcloud'
// import Music from '../components/music'

const Home = () => {
  // const { spotifyAccessToken } = props;

  return (
    <Page>
      <Head>
        <title>Michael Schultz | Product Designer & Engineer</title>
      </Head>
      <Nav />
      <Intro />
      <Projects />
      {/* Music I'm lisening to, coming soon */}
      {/* <Music spotifyAccessToken={spotifyAccessToken} /> */}
      <Soundcloud />
      <DesignThoughts />
      {/* <Friends /> */}
    </Page>
  )
}

export default Home
