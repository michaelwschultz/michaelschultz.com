import React from 'react'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'


export default function LocalWeather() {
  function calculateCelsius(number) {
    return Math.round((number - 32) * 5 / 9)
  }

  const { data: weather, error } = useSWR('/api/weather', fetcher)
  // TODO: create a notification instead of this inline message
  if (error) return <div>Oh no, failed to load forecast. Try again later.</div>
  if (!weather) return <div>Loading forecast in SF...</div>

  return (
  <div className='weather-forecast'>
    San Francisco: {weather.forecast[0].temperature}&#8457; / {calculateCelsius(weather.forecast[0].temperature)}&#8451;
  </div>
  )
}

