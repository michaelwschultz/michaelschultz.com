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
            <img className="db w-100 br2" src="assets/friends/brian-lovin.webp" />
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }}
          />
          <a href="http://twitter.com/anthonyshort">
            <img className="db w-100 br2" src="assets/friends/anthony-short.webp" />
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }}
          />
          <a href="http://twitter.com/superbryntendo">
            <img className="db w-100 br2" src="assets/friends/bryn-jackson.webp" />
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }}
          />
          <a href="http://twitter.com/kleinmaetschke">
            <img className="db w-100 br2" src="assets/friends/klein-maetschke.webp" />
          </a>
        </div>
        <div className="relative hide-child">
          <span
            className="child absolute padded-border b--white br2 h-100 w-100"
            style={{ pointerEvents: "none", zIndex: 10 }}
          />
          <a href="http://twitter.com/luketns">
            <img className="db w-100 br2" src="assets/friends/luke-schultz.webp" />
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