import React from 'react'
// import axios from 'axios';

import Friends from '../components/friends'
import Intro from '../components/intro'
// import Music from '../components/music'
import Page from '../components/page'
import Projects from '../components/projects'
import DesignThoughts from '../components/designThoughts'

const Home = () => {
  // const { spotifyAccessToken } = props;

  return (
    <Page>
      <Intro />
      <Projects />
      {/* <Music spotifyAccessToken={spotifyAccessToken} /> */}
      <DesignThoughts />
      <Friends />
    </Page>
  )
}

export default Home
