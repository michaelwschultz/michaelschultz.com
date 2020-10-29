import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import axios from 'axios'

const capitalize = (string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

function Music(props) {
  // const { spotifyAccessToken } = props;
  // const [artistImage, setArtistImage] = useState();
  const [artistData, setArtistData] = useState()
  const [mostRecentSong, setMostRecentSong] = useState()
  const [currentlyListening, setCurrentlyListening] = useState(false)

  const userName = 'michaelschultz'
  const mostRecentTrackLimit = 1
  const weeklyLimit = 5
  const lastfm_recent_request = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${userName}&limit=${mostRecentTrackLimit}&api_key=${process.env.NEXT_PUBLIC_LASTFM_TOKEN}&format=json`
  const lastfm_weekly_request = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${userName}&limit=${weeklyLimit}&period=7day&api_key=${process.env.NEXT_PUBLIC_LASTFM_TOKEN}&format=json`

  const [
    {
      data: lastfmRecentTrackData,
      loading: lastfmRecentTrackLoading,
      error: lastfmRecentTrackError,
    },
    lastfmRecentTrackRefresh,
  ] = useAxios(lastfm_recent_request)
  const [
    { data: lastfmData, loading: lastfmLoading, error: lastfmError },
    lastfmRefresh,
  ] = useAxios(lastfm_weekly_request)

  // const getSpotifyData = async function(artist, spotifyAccessToken) {
  //   await axios({
  //     url: `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,
  //     method: 'get',
  //     headers: {
  //       Authorization: `Bearer ${spotifyAccessToken}`,
  //     }
  //   }).then(function(response) {
  //     setArtistImage(response.data.artists.items[0].images[0].url);
  //     setArtistData(response);
  //     return {
  //       data: response.data
  //     }
  //   }).catch(function(error) {
  //       console.log(error);
  //   });
  // }

  console.log('lastFM data!', lastfmData)

  useEffect(() => {
    if (lastfmRecentTrackData) {
      setArtistData(lastfmRecentTrackData.recenttracks.track[0])
      const firstTrackData = lastfmRecentTrackData.recenttracks.track[0]
      const song = capitalize(firstTrackData.name)
      const artist = capitalize(firstTrackData.artist['#text'])
      const rawSongAndArtist = `${song} by ${artist}`
      const currentlyListening = firstTrackData['@attr']
      let songAndArtist = rawSongAndArtist

      if (currentlyListening) {
        songAndArtist = `Listening to ${rawSongAndArtist}`
      } else {
        songAndArtist = `Recently listened to ${rawSongAndArtist}`
      }

      // getSpotifyData(artist, spotifyAccessToken);
      setMostRecentSong(songAndArtist)
      setCurrentlyListening(currentlyListening)
    }
  }, [lastfmRecentTrackData])

  // useEffect(() => {
  //   if (lastfmData) {
  //     setArtistData(lastfmData.recenttracks.track);
  //     const firstTrackData = lastfmData.recenttracks.track[0];
  //     const song = capitalize(firstTrackData.name);
  //     const artist = capitalize(firstTrackData.artist['#text']);
  //     const rawSongAndArtist = `${song} by ${artist}`;
  //     const currentlyListening = firstTrackData["@attr"];
  //     let songAndArtist = rawSongAndArtist;

  //     if (currentlyListening) {
  //       songAndArtist = `Listening to ${rawSongAndArtist}`;
  //     } else {
  //       songAndArtist = `Recently listened to ${rawSongAndArtist}`;
  //     }

  //     // getSpotifyData(artist, spotifyAccessToken);
  //     setMostRecentSong(songAndArtist);
  //     setCurrentlyListening(currentlyListening);
  //   }
  // }, [lastfmData]);

  return (
    <section className='mw8 center mt6'>
      <h3 className='white f5 pb2'>Music I've been listening to this week</h3>
      <div className='flex items-center mb3'>
        <a
          className='pr2'
          style={{ flexShrink: 0, cursor: 'pointer' }}
          onClick={lastfmRecentTrackRefresh}
          title='Check for more recent song.'
        >
          <img
            src='./assets/record-player.svg'
            className={lastfmData && currentlyListening ? 'spin-animation' : ''}
            id='recordPlayer'
            width='24px'
            height='24px'
          />
        </a>
        <p id='currentSong' className='color-pink f5'>
          {lastfmRecentTrackLoading && 'Loading song data from last.fm...'}
          {lastfmRecentTrackError &&
            !lastfmRecentTrackLoading &&
            'Error loading data from last.fm...'}
          {lastfmRecentTrackData && !lastfmRecentTrackLoading && mostRecentSong}
        </p>
      </div>

      <div id='myLastFm' className='cf'>
        <div className='fl'>
          <div id='firstArtist' className='fl w-100'>
            {artistData && (
              <div className='relative hide-child'>
                <span
                  className='child absolute ba b--white br2 h-100 w-100'
                  style={{ pointerEvents: 'none', zIndex: 10 }}
                />
                <h2
                  className='white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked'
                  style={{ pointerEvents: 'none', zIndex: 10 }}
                >
                  {artistData.artist['#text']}
                </h2>
                <a href={artistData.url} className='darken'>
                  <img
                    src={artistData.image[3]['#text']}
                    className='br2'
                    width='400'
                    height='400'
                    style={{ objectFit: 'cover' }}
                  />
                </a>
              </div>
            )}
          </div>
        </div>
        <div id='artists' className='fl w-50'>
          {lastfmData &&
            lastfmData.topartists.artist.map((track, index) => {
              const artistName = track.name
              const artistImage = track.image[3]['#text']
              const artistUrl = track.url

              // only show 4 artists
              if (index >= 5) return null

              return (
                <div className='fl w-50'>
                  <div className='relative hide-child ph1'>
                    <span
                      className='child absolute ba b--white br2 h-100 w-100'
                      style={{ pointerEvents: 'none', zIndex: 10 }}
                    />
                    <h2
                      className='white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked'
                      style={{ pointerEvents: 'none', zIndex: 10 }}
                    >
                      {artistName}
                    </h2>
                    <a href={artistUrl} className='darken'>
                      <img
                        src={artistImage}
                        className='br2'
                        width='400'
                        height='400'
                        style={{ objectFit: 'cover' }}
                      />
                    </a>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default Music
