import React from 'react'

import { ThemeType } from '../lib/types'

const DesignThoughts = (props: { theme: ThemeType }) => {
  const { theme } = props

  return (
    <section className="mw8 center mv6 ph3">
      <h3 className="white f5 pb2">Thoughts on design</h3>
      <iframe src='https://embed.simplecast.com/c6d6f4c3' width='100%' frameBorder='0' height='200px' scrolling='no' seamless>
      </iframe>
    </section>
  )
}

export default DesignThoughts