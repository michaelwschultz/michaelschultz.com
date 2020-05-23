import React from 'react'
import { Lazy } from 'react-lazy'

const DesignThoughts = (): JSX.Element => {
  return (
    <section className="mw8 center mv6">
      <h3 className="white f5 pb3">Thoughts on design</h3>
      <Lazy>
        <iframe
          src='https://embed.simplecast.com/c6d6f4c3'
          width='100%'
          frameBorder='0'
          height='200px'
          scrolling='no'
          seamless
        />
      </Lazy>
    </section>
  )
}

export default DesignThoughts