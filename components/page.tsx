import React from 'react'
import Nav from './nav'

import { ThemeContext, Themes } from '../lib/themeContext'

interface PageProps {
  children: any,
}

export default (props: PageProps) => {

  // TODO
  // move the theme provider to the _document
  // so it doesn't load on every navigation change

  function chooseRandomTheme() {
    // choose a theme on page load
    const randomNumber = Math.random()
    let i = 0

    if (randomNumber < 0.25) {
      i = 1
    } else if (randomNumber <= 0.50) {
      i = 2
    } else if (randomNumber <= 0.75) {
      i = 3
    }

    return Themes[i]
  }
  
  const theme = chooseRandomTheme()

  return (
    <ThemeContext.Provider value={theme}>
      <div className="wrapper ph3">
        <div id="bg" className="backgroundImage">
          <img
            src={`./assets/backgrounds/${theme.backgroundImage}.jpg`}
            alt="random foliage background"
            className="fadeIn"
          />
        </div>
        <Nav />
        {props.children}
      </div>
      <style jsx>{`
        .backgroundImage {
          filter: blur(8px);
        }
        .wrapper {
          overflow: hidden;
        }
      `}</style>
    </ThemeContext.Provider>
  )
}