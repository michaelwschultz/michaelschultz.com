import React from 'react'

import { ThemeContext } from '../lib/themeContext'

const Projects = () => {
  const theme = React.useContext(ThemeContext)

  return (
    <section className="mw8 center mt5 ph3">
      <h3 className="white f5 pb2">Other projects I'm working on</h3>
      <div className="cf">
        <div className="fl">
          <div className="br2 ma1 ml0 pb2">
            <div className="fl w-100 w-25-ns pt1 pb1 pr1">
              <div className="relative w-100 hide-child">
                <span className="child absolute bottom-0 ba b--white br2 h-100 w-100" style={{ pointerEvents: "none", zIndex: 10 }}></span>
                <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>
                  The Podcast
                </h2>
                <a href="https://anchor.fm/cousins" className="darken">
                  <img src="./assets/cousins-podcast-thumbnail.png" className="w-100 br2" style= {{ minHeight: "225px" }} />
                </a>
              </div>
            </div>
            <div className="fl w-100 w-25-ns pa1">
              <div className="relative w-100 hide-child">
                <span className="child absolute bottom-0 ba b--white br2 h-100 w-100" style={{ pointerEvents: "none", zIndex: 10 }}></span>
                <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>
                  The App
                </h2>
                <a href="https://github.com/michaelwschultz/timelapse-app" className="darken">
                  <img src="./assets/timelapse-thumbnail.png" className="w-100 br2" style={{ minHeight: "225px" }} />
                </a>
              </div>
            </div>
            <div className="fl w-100 w-25-ns pa1">
              <div className="relative w-100 hide-child">
                <span className="child absolute bottom-0 ba b--white br2 h-100 w-100" style={{ pointerEvents: "none", zIndex: 10 }}></span>
                <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>
                  The Game
                </h2>
                <a href="https://github.com/michaelwschultz/virgo" className="darken">   
                  <img src="./assets/virgo-thumbnail.png" className="w-100 br2" style={{ minHeight: "225px" }} />
                </a>
              </div>
            </div> 
            <div className="fl w-100 w-25-ns pa1">
              <div className="relative w-100 hide-child">
                <span className="child absolute bottom-0 ba b--white br2 h-100 w-100" style={{ pointerEvents: "none", zIndex: 10 }}></span>
                <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>
                  The Music
                </h2>
                <a href="https://soundcloud.com/michaelschultz" className="darken">
                  <img src="./assets/michael-schultz-music-thumbnail.png" className="w-100 br2" style={{ minHeight: "225px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects