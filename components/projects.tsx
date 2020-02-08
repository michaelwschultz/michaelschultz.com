import React from 'react'

const Projects = () => {
  return (
    <section className="mw8 center mt5"> 
      <h3 className="white f5 pb3">Projects I'm working on</h3>
      <div className="grid">
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }} 
          />
          <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>
            Cousins Podcast
          </h2>
          <a href="http://cousinspodcast.com" className="darken">
            <img src="./assets/cousins-podcast-thumbnail.png" className="w-100 br2" style= {{ minHeight: "225px" }} />
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }} 
          />
          <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>
            Timelapse App
          </h2>
          <a href="https://github.com/michaelwschultz/timelapse-app" className="darken">
            <img src="./assets/timelapse-thumbnail.png" className="w-100 br2" style={{ minHeight: "225px" }} />
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }} 
          />
          <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>
            RPi Game
          </h2>
          <a href="https://github.com/michaelwschultz/virgo" className="darken">   
            <img src="./assets/virgo-thumbnail.png" className="w-100 br2" style={{ minHeight: "225px" }} />
          </a>
        </div> 
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }} 
          />
          <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>
            Music
          </h2>
          <a href="https://soundcloud.com/michaelschultz" className="darken">
            <img src="./assets/michael-schultz-music-thumbnail.png" className="w-100 br2" style={{ minHeight: "225px" }} />
          </a>
        </div>
      </div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
          grid-gap: 1rem;
        }
      `}</style>
    </section>
  )
}

export default Projects