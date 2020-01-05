import React from 'react'

import { ThemeType } from '../lib/types'

const Projects = (props: { theme: ThemeType }) => {
  const { theme } = props

  return (
    <section className="mw8 center mt5 ph3">
      <h3 className="white f5 pb2">Other projects I'm working on</h3>
      <div className="cf">
        <div className="fl">
          <div className="br2 ma1 ml0 pb2">
            <div className="fl w-100 w-25-ns pt1 pb1 pr1">
              <div className="relative w-100 hide-child">
                <span className="child absolute bottom-0 ba b--white br2 h-100 w-100" style={{ pointerEvents: "none", zIndex: 10 }}></span>
                <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>Cousins The Podcast</h2>
                <a href="https://anchor.fm/cousins" className="darken">
                  <img src="./assets/michael-luke.jpg" className="w-100 br2" style= {{ minHeight: "225px" }} />
                </a>
              </div>
            </div>
            <div className="fl w-100 w-25-ns pa1">
              <div className="relative w-100 hide-child">
                <span className="child absolute bottom-0 ba b--white br2 h-100 w-100" style={{ pointerEvents: "none", zIndex: 10 }}></span>
                <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>Timelapse App</h2>
                <a href="https://github.com/michaelwschultz/timelapse-app" className="darken">
                  <img src="./assets/timelapse-app-screenshot.jpg" className="w-100 br2" style={{ minHeight: "225px" }} />
                </a>
              </div>
            </div>
            <div className="fl w-100 w-25-ns pa1">
              <div className="relative w-100 hide-child">
                <span className="child absolute bottom-0 ba b--white br2 h-100 w-100" style={{ pointerEvents: "none", zIndex: 10 }}></span>
                <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>Timelapse App</h2>
                <a href="https://github.com/michaelwschultz/timelapse-app" className="darken">
                  <img src="./assets/timelapse-app-screenshot.jpg" className="w-100 br2" style={{ minHeight: "225px" }} />
                </a>
              </div>
            </div>
            <div className="fl w-100 w-25-ns pa1">
              <div className="relative w-100 hide-child">
                <span className="child absolute bottom-0 ba b--white br2 h-100 w-100" style={{ pointerEvents: "none", zIndex: 10 }}></span>
                <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>Timelapse App</h2>
                <a href="https://github.com/michaelwschultz/timelapse-app" className="darken">
                  <img src="./assets/timelapse-app-screenshot.jpg" className="w-100 br2" style={{ minHeight: "225px" }} />
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