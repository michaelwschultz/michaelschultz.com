import React from 'react'
import ReactPlayer from 'react-player';

const Soundcloud = () => {
  return (
    <section className="mw8 center mt6">
      <h3 className="white f5 pb3">Music I've made</h3>
      <ReactPlayer url="https://soundcloud.com/michaelschultz/tracks" width="100%" />
    </section>
  )
}

export default Soundcloud