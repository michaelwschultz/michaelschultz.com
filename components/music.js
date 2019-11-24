import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'

const capitalize = (string) => {
  return string.toLowerCase()
  .split(' ')
  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  .join(' ');
}

function Music() {
  const [fetchedData, setFetchedData] = useState();
  const [mostRecentSong, setMostRecentSong] = useState();
  const [currentlyListening, setCurrentlyListening] = useState(false);
  const userName = "michaelschultz";
  const limit = 1;
  const lastfm_api = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${userName}&limit=${limit}&api_key=${process.env.LASTFM_TOKEN}&format=json`;

  const [{ data, loading, error }, refresh] = useAxios(lastfm_api);

  useEffect(() => {
    if (data) {
      const trackData = data.recenttracks.track[0];
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

      setMostRecentSong(songAndArtist);
      setCurrentlyListening(currentlyListening);
    }

    setFetchedData(data);    
  }, [data]);

  return (
    <section className="mw8 center mt6 ph3">
      <h2 className="color-blue pv2 pb3 lh-title">
        Music that’s been dominating my headphones this week
      </h2>
      <div className="flex items-center mb3">
        <a
          className="pr2"
          style={{ flexShrink: 0, cursor: "pointer" }}
          onClick={refresh}
          title="Check for more recent song."
        >
          <img src="./assets/record-player.svg" className={fetchedData && currentlyListening ? "spin-animation" : ""} id="recordPlayer" width="24px" height="24px" />
        </a>
        <p id="currentSong" className="color-pink f5">
          {loading && 'Loading song data from last.fm...'}
          {error && !loading && 'Error loading data from last.fm...'}
          {fetchedData && !loading && mostRecentSong}
        </p>
      </div>
      <div id="myLastFm" className="cf">
        <div id="firstArtist">
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