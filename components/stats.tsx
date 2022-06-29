import LocalWeather from './localWeather'

const Stats = () => {
  return (
    <section className='mw8 center mt5 pb6'>
      <h3 className='white f5 pb3'>Stats</h3>
      <div className='forecast'>
        <LocalWeather />
      </div>
    </section>
  )
}

export default Stats
