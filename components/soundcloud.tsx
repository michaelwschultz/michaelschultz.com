import React from 'react'

const Soundcloud = () => {
  return (
    <section className="mw8 center mt5">
      <iframe
        width="100%"
        height="450"
        scrolling="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1291667&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
      >
      </iframe>
    </section>
  )
}

export default Soundcloud