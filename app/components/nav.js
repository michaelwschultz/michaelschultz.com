import React from 'react'
import Link from 'next/link'

const Nav = () => (
  <header className="mw8 center mt4 ph3">
    <h1>
      <a href="/" className="flex-no-shrink f3 color-pink hover-pink link" style={{ flexShrink: 0 }}>
        Michael Schultz
      </a>
    </h1>
    <nav className="flex flex-column flex-row-ns justify-between items-center-ns">
      <div className="nowrap">
        <a className="f6 link br1 ba color-pink hover-pink pa3 mr2 mv3 dib"
          href="/projects">
          Portfolio
          </a>
        <a className="f6 link br1 ba color-pink hover-pink pa3 mr2 mv3 dib white"
          href="/resume">
          Resume
          </a>
      </div>
      <div>
        <Link>
          <a className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3 pr3"
            href="http://twitter.com/michaelschultz"
          >
            Twitter
          </a>
        </Link>
        <Link>
          <a className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3 pr3"
            href="http://github.com/michaelwschultz"
          >
            Github
          </a>
        </Link>
        <Link>
          <a className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3 pr3"
            href="http://linkedin.com/in/mikewschultz"
          >
            LinkedIn
          </a>
        </Link>
        <Link>
          <a className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3 pr3"
            href="http://dribbble.com/michaelschultz"
          >
            Dribbble
          </a>
        </Link>
        <Link>
          <a className="link color-pink hover-pink dib f6 fw4 ttu tracked pv3"
            href="http://instagram.com/michaelschultz"
          >
            Instagram
          </a>
        </Link>
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
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </header>
)

export default Nav
