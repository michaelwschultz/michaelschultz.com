import React from 'react'

const Insta = () => (
  <section className="mw8 center mt5 ph3">
    <h2 className="color-blue pv2 pb3 lh-title">
      Photos I’ve posted to {` `}
      <a
        className="color-blue hover-blue"
        href="http://instagram.com/michaelschultz"
      >
        Instagram
      </a>
    </h2>

    <div id="instafeed" className="flex flex-wrap"></div>
  </section>
)

export default Insta