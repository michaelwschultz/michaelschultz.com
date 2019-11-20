import React from 'react'
import Link from 'next/link'

const Nav = () => (
  <header className="mw8 center mt4 ph3">
    <h1>
      <Link href="/">
        <a className="flex-no-shrink f3 color-pink hover-pink link" style={{ flexShrink: 0 }}>
          Michael Schultz
        </a>
      </Link>
    </h1>
    <nav className="flex flex-column flex-row-ns justify-between items-center-ns">
      <div className="nowrap">
        <Link href="/projects">
          <a className="f6 link br1 ba color-pink hover-pink pa3 mr2 mv3 dib">
            Portfolio
          </a>
        </Link>
        <Link href="/resume">
          <a className="f6 link br1 ba color-pink hover-pink pa3 mr2 mv3 dib white">
            Resume
          </a>
        </Link>
      </div>
      <div>
        <a href="http://twitter.com/michaelschultz" className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3 pr3">
          Twitter
        </a>
        <a href="http://github.com/michaelwschultz" className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3 pr3">
          Github
        </a>
        <a href="http://linkedin.com/in/mikewschultz" className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3 pr3">
          LinkedIn
        </a>
        <a href="http://dribbble.com/michaelschultz" className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3 pr3">
          Dribbble
        </a>
        <a href="http://instagram.com/michaelschultz" className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3">
          Instagram
        </a>
        {/* <Link>
          <a class="link color-pink hover-pink dib f6 fw4 ttu tracked pv3 pl3 pr2"
            href="http://twitch.com/idigg"
            onclick="trackOutboundLink('http://twitch.com/idigg'); return false;">
            Twitch <span id="status" style="display: none;" class="bg-pink white br2 ph1 f6">Live No w</span>
          </a>
        </Link> */}
      </div>
    </nav>
    <style jsx>{`
      nav {
        text-align: center;
      }
    `}</style>
  </header>
)

export default Nav
