import { NextApiRequest, NextApiResponse } from 'next'

export default async function getWeather(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // const SF_COORDINATES = { lat: '37.7853', long: '-122.3989' }
  const OAKLAND_COORDINATES = { lat: '37.7310', long: '-122.1565' }

  // Alt service
  // const nationalWeatherService = `https://api.weather.gov/points/${SF_COORDINATES.lat},${SF_COORDINATES.long}`;
  const lilWeatherApi = `https://api.lil.software/weather?latitude=${OAKLAND_COORDINATES.lat}&longitude=${OAKLAND_COORDINATES.long}`

  await fetch(lilWeatherApi).then((response) => {
    res.json(response.body)
  })
}
