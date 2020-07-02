import { NextApiRequest, NextApiResponse } from 'next'

export default async function getWeather(_req: NextApiRequest, res: NextApiResponse) {
  const SF_COORDINATES = { lat: '37.7853', long: '-122.3989'};
  // Alt service
  // const nationalWeatherService = `https://api.weather.gov/points/${SF_COORDINATES.lat},${SF_COORDINATES.long}`;
  const lilWeatherApi = `https://api.lil.software/weather?latitude=${SF_COORDINATES.lat}&longitude=${SF_COORDINATES.long}`;

  await fetch(lilWeatherApi)
  .then(response => {
    res.json(response.body)
  })
}