import React from 'react'
import ReactPlayer from 'react-player';

const DesignThoughts = () => {
  return (
    <section className="mw8 center mv6">
      <h3 className="white f5 pb3">Thoughts on design</h3>
      <iframe
        src='https://embed.simplecast.com/c6d6f4c3'
        width='100%'
        frameBorder='0'
        height='200px'
        scrolling='no'
        seamless
        loading="lazy"
        >
      </iframe>
    </section>
  )
}

export default DesignThoughts