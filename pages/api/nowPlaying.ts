import { NextApiRequest, NextApiResponse } from 'next'

const LASTFM_API_KEY = 'a598c3064191ff18ee9756b6d8e41ea4'

interface Text {
  '#text': string
}

interface Track {
  artist: Text
  album: Text
  name: string
}

interface NowPlayingResponse {
  recenttracks: {
    track: Track[]
  }
}

export default async function getNowPlaying(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const API = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=michaelschultz&api_key=${LASTFM_API_KEY}&format=json`

  await fetch(API).then(async (response) => {
    return response.json().then((data: NowPlayingResponse) => {
      const track = data.recenttracks.track[0]

      const mostRecentlyPlayedTrack = {
        name: track.name,
        artist: track.artist['#text'],
        album: track.album['#text'],
      }

      res.send(mostRecentlyPlayedTrack)
    })
  })
}
