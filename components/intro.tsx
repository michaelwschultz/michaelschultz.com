import React from 'react'
import Link from 'next/link'

import { ThemeContext } from '../lib/themeContext'

const Intro = () => {
  const theme = React.useContext(ThemeContext)

  return (
    <section className="mw8 center mt5">
      <div className="flex justify-between items-center">
        <h2 className="white">Howdy, I'm Michael.</h2>
      </div>
      <div className="cf">
        <div className="fl w-100-m">
          <div className="br2 ma1 ml0 pb2">
            <div className="fr w-100 w-50-ns pl3-ns pb4">
              <div className="relative w-100 hide-child">
                <span
                  className="child absolute padded-border b--white br2 h-100 w-100"
                  style={{ pointerEvents: "none", zIndex: 10 }} 
                />  
                <a href="https://www.newfrontinsurance.com" className="darken">
                  <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>
                    Newfront Insurance
                  </h2>
                  <img className="w-100 br2" src="./assets/newfront-insurance-thumbnail.png" />
                </a>
              </div>
            </div>
            <p className="white pb2 lh-copy">
              After designing public health tools at {` `}
              <a href="https://iodine.com" className="white hover-purple" target="_blank">
                Iodine
              </a>
              , and a quick dip into politics at Sidewire, I joined Newfront Insurance in December of 2017 to help design and build a modern insurance brokerage.
            </p>
            <p className="white pb2 lh-copy">
              At Newfront, we're building tools that make life easier for brokers, their clients, and our account managers. Some of these tools include automation and others improve the communication process between each group.
            </p>
            <p className="white pb2 lh-copy">
              If you're looking for commercial or personal insurance or are interested in helping build a big business, join us at {` `}
              <a className="white hover-blue" href="https://www.newfrontinsurance.com" target="_blank">
              Newfront
              </a>.
            </p>
            <Link href="./projects">
              <a className={`${theme.textColor} hover-white f6 link br1 ba hover pa3 mv3 dib nowrap`}>
                See more of my work
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro