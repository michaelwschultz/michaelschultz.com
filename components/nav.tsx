import Link from 'next/link'

import Hud from './hud'

const Nav = () => {
  const linkClasses = 'green hover-white link dib f6 fw4 ttu tracked pv3'

  return (
    <header className='mw8 center pt4 relative'>
      {/* <h1>
        <Link href="/">
          <a className="flex-no-shrink f3 color-pink hover-pink link" style={{ flexShrink: 0 }}>
            Michael Schultz
          </a>
        </Link>
      </h1> */}
      <Hud />
      <nav className='flex flex-column flex-row-ns justify-between items-center-ns'>
        <div className='nowrap'>
          <Link href='/'>
            <a className='green hover-white f6 link br1 ba pa3 mr2 mv3 dib'>
              Home
            </a>
          </Link>
          <Link href='/design'>
            <a className='green hover-white f6 link br1 ba pa3 mr2 mv3 dib'>
              Design
            </a>
          </Link>
          {/* Bring back resume at some point
              For more info checkout LinkedIn
          <Link href="/resume">
            <a className="f6 link br1 ba color-pink hover-pink pa3 mr2 mv3 dib white">
              Resume
            </a>
          </Link> */}
        </div>
        <div>
          <a
            href='http://twitter.com/michaelschultz'
            className={`${linkClasses} pr3`}
          >
            Twitter
          </a>
          <a
            href='http://github.com/michaelwschultz'
            className={`${linkClasses} pr3`}
          >
            Github
          </a>
          <a
            href='http://linkedin.com/in/mikewschultz'
            className={`${linkClasses} pr3`}
          >
            LinkedIn
          </a>
          <a
            href='http://dribbble.com/michaelschultz'
            className={`${linkClasses} pr3`}
          >
            Dribbble
          </a>
          <a href='http://instagram.com/michaelschultz' className={linkClasses}>
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
    </header>
  )
}

export default Nav
