import React from 'react'
import axios from 'axios';
import Head from 'next/head'

import Page from '../components/page'
import Intro from '../components/intro'
import Music from '../components/music'
import Friends from '../components/friends'

const Home = props => {
  const { spotifyAccessToken } = props;

  return (
    <Page>
      <Head>
        <title>Michael Schultz</title>
      </Head>

      <Intro />
      <Music spotifyAccessToken={spotifyAccessToken} />
      <Friends />
    </Page>
  )
}

Home.getInitialProps = async function() {
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const spotify = await axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: spotifyClientId,
      password: spotifyClientSecret
    }
  }).then(function(response) {
    return {
      access_token: response.data.access_token
    }
  }).catch(function(error) {
      console.log(error);
  });

  return {
    spotifyAccessToken: spotify.access_token
  };
};

export default Home
