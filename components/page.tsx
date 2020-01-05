import React from 'react'
import Nav from './nav'
import { ThemeType } from '../lib/types'

interface PageProps {
  children: any,
  theme: ThemeType,
}

export default (props: PageProps) => {
  const { children, theme } = props

  const selectBackgroundImage = () => {
    return `./assets/backgrounds/${theme.backgroundImage}.jpg`;
  }

  return (
    <div>
      <div id="bg" className="backgroundImage">
        <img
          src={selectBackgroundImage()}
          alt="random foliage background"
          className="fadeIn"
        />
      </div>
      <Nav theme={theme} />
      {children}
    </div>
  )
}