import React from 'react'

import LocalWeather from './localWeather'

const Hud = () => {
  return (
    <a
      className='forecast link'
      href='https://lil.software/api/'
      title='Weather provided by lilApi'
    >
      <LocalWeather />
      <style jsx>{`
        .forecast {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 12px;
          color: white;
          opacity: 0.7;
          background: rgba(255, 255, 255, 0.1);
          padding: 16px;
          border-radius: 0 0 4px 4px;
          transition: background 0.1s linear;
        }

        .forecast:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        @media screen and (max-width: 30em) {
          .forecast {
            display: none;
          }
        }
      `}</style>
    </a>
  )
}

export default Hud
