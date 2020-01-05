import React from 'react'
// import axios from 'axios';

import Friends from '../components/friends'
import Intro from '../components/intro'
// import Music from '../components/music'
import Page from '../components/page'
import Projects from '../components/projects'
import DesignThoughts from '../components/design_thoughts'

const Home = props => {
  // const { spotifyAccessToken } = props;
  const { theme } = props; 

  return (
    <Page theme={theme}>
      <Intro theme={theme} />
      <Projects theme={theme} />
      {/* <Music spotifyAccessToken={spotifyAccessToken} /> */}
      <DesignThoughts theme={theme} />
      <Friends theme={theme} />
    </Page>
  )
}

Home.getInitialProps = async function() {
  const randomNumber = Math.random();
    const theme = {
      backgroundImage: '1',
      textColor: 'color-teal',
    };

    if (randomNumber < 0.25) {
      theme.backgroundImage = '2';
      theme.textColor = 'pink';
    } else if (randomNumber <= 0.50) {
      theme.backgroundImage = '3';
      theme.textColor = 'color-light-purple';
    } else if (randomNumber <= 0.75) {
      theme.backgroundImage = '4';
      theme.textColor = 'color-green';
    }
  
  // const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  // const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  // const spotify = await axios({
  //   url: 'https://accounts.spotify.com/api/token',
  //   method: 'post',
  //   params: {
  //     grant_type: 'client_credentials'
  //   },
  //   headers: {
  //     'Accept':'application/json',
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   auth: {
  //     username: spotifyClientId,
  //     password: spotifyClientSecret
  //   }
  // }).then(function(response) {
  //   return {
  //     access_token: response.data.access_token
  //   }
  // }).catch(function(error) {
  //     console.log(error);
  // });

  return {
    // spotifyAccessToken: spotify.access_token
    theme
  };
};

export default Home
