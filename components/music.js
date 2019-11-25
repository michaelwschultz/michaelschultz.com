import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';

const capitalize = (string) => {
  return string.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');
}

function Music(props) {
  const { spotifyAccessToken } = props;
  const [artistImage, setArtistImage] = useState();
  const [artistData, setArtistData] = useState();
  const [mostRecentSong, setMostRecentSong] = useState();
  const [currentlyListening, setCurrentlyListening] = useState(false);

  const userName = "michaelschultz";
  const limit = 1;
  const lastfm_request = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${userName}&limit=${limit}&api_key=${process.env.LASTFM_TOKEN}&format=json`;
  
  const [{ data: lastfmData, loading: lastfmLoading, error: lastfmError }, lastfmRefresh] = useAxios(lastfm_request);

  const getSpotifyData = async function(artist, spotifyAccessToken) {
    await axios({
      url: `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=${limit}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      }
    }).then(function(response) {
      setArtistImage(response.data.artists.items[0].images[0].url);
      setArtistData(response);
      return {
        data: response.data
      }
    }).catch(function(error) {
        console.log(error);
    });
  }

  useEffect(() => {
    if (lastfmData) {
      const trackData = lastfmData.recenttracks.track[0];
      const song = capitalize(trackData.name);
      const artist = capitalize(trackData.artist['#text']);
      const rawSongAndArtist = `${song} by ${artist}`;
      const currentlyListening = trackData["@attr"];
      let songAndArtist = rawSongAndArtist;

      if (currentlyListening) {
        songAndArtist = `Listening to ${rawSongAndArtist}`;
      } else {
        songAndArtist = `Recently listened to ${rawSongAndArtist}`;
      }

      getSpotifyData(artist, spotifyAccessToken);
      setMostRecentSong(songAndArtist);
      setCurrentlyListening(currentlyListening);
    }
  }, [lastfmData]);


  return (
    <section className="mw8 center mt6 ph3">
      <h2 className="color-blue pv2 pb3 lh-title">
        Music that’s been dominating my headphones this week
      </h2>
      <div className="flex items-center mb3">
        <a
          className="pr2"
          style={{ flexShrink: 0, cursor: "pointer" }}
          onClick={lastfmRefresh}
          title="Check for more recent song."
        >
          <img src="./assets/record-player.svg" className={lastfmData && currentlyListening ? "spin-animation" : ""} id="recordPlayer" width="24px" height="24px" />
        </a>
        <p id="currentSong" className="color-pink f5">
          {lastfmLoading && 'Loading song data from last.fm...'}
          {lastfmError && !lastfmLoading && 'Error loading data from last.fm...'}
          {lastfmData && !lastfmLoading && mostRecentSong}
        </p>
      </div>

      <div id="myLastFm" className="cf">
        <div id="firstArtist">
          {artistData && (
            <a href={artistData.data.artists.items[0].external_urls.spotify}>
              <img src={artistImage} width="400" height="400" style={{ objectFit: "cover" }} />
            </a>
          )}
          
          {/* <!-- get first arists and make it bigger --> */}
        </div>
        <div id="artists">
          {/* <!-- get arists --> */}
        </div>
      </div>
    </section>
  )
}

export default Music;