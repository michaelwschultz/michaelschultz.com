import React from 'react'

import { ThemeContext } from '../lib/themeContext'

const Friends = () => {
  const theme = React.useContext(ThemeContext)

  return (
    <section className="mw8 center mv6">
      <h3 className="white f5 pb3">Designer friends</h3>
      <div className="grid">
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }}
          />
          <a href="http://twitter.com/brian_lovin">
            <picture className="db w-100 br2">
              <source srcSet="./assets/friends/brian-lovin.webp" type="image/webp" />
              <img src="./assets/friends/brian-lovin.jpg" alt="brian lovin" />
            </picture>
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }}
          />
          <a href="http://twitter.com/anthonyshort">
            <picture className="db w-100 br2">
              <source srcSet="./assets/friends/anthony-short.webp" type="image/webp" />
              <img src="./assets/friends/anthony-short.jpg" alt="anthony short" />
            </picture>
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }}
          />
          <a href="http://twitter.com/superbryntendo">
            <picture className="db w-100 br2">
              <source srcSet="./assets/friends/bryn-jackson.webp" type="image/webp" />
              <img src="./assets/friends/bryn-jackson.jpg" alt="bryn jackson" />
            </picture>
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }}
          />
          <a href="http://twitter.com/kleinmaetschke">
            <picture className="db w-100 br2">
              <source srcSet="./assets/friends/klein-maetschke.webp" type="image/webp" />
              <img src="./assets/friends/klein-maetschke.jpg" alt="klein maetschke" />
            </picture>
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }}
          />
          <a href="http://twitter.com/luketns">
            <picture className="db w-100 br2">
              <source srcSet="./assets/friends/luke-schultz.webp" type="image/webp" />
              <img src="./assets/friends/luke-schultz.png" alt="luke schultz" />
            </picture>
          </a>
        </div>
      </div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
          grid-gap: 1rem;
        }
      `}</style>
    </section>
  )
}

export default Friends