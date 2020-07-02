import React from 'react'

import LocalWeather from './localWeather'

export default function Stats() {
  return (
    <section className="mw8 center mt5 pb6">
      <h3 className="white f5 pb3">
        Stats
      </h3>
      <div className='forecast'>
        <LocalWeather />
      </div>
      <style jsx>{`
        .forecast {
          font-size: 14px;
          color: white;
        }
      `}</style>
    </section>
  )
}