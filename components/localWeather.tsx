import useSWR from 'swr'
import fetcher from '../lib/fetcher'

interface Temp {
  temperature: number
}
interface Weather {
  forecast?: Temp[]
}

export default function LocalWeather() {
  function calculateCelsius(number: number) {
    return Math.round(((number - 32) * 5) / 9)
  }

  const { data: weather, error } = useSWR<Weather>('/api/getWeather', fetcher)
  // TODO: create a notification instead of this inline message
  if (error) return <div>Oh no, failed to load forecast. Try again later.</div>
  if (!weather) return <div>Loading forecast...</div>

  const degree = weather.forecast?.[0].temperature

  console.log(degree)

  if (!degree) return <span className='weather-forecast'>No data...</span>

  return (
    <span className='weather-forecast'>
      Oakland: {degree}&#8457; / {degree && calculateCelsius(degree)}&#8451;
    </span>
  )
}
