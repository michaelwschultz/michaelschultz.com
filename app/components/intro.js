import React from 'react'
import Link from 'next/link'

const Intro = () => (
  <section className="mw8 center mt5 ph3">
    <div className="flex justify-between items-center">
      <h2 className="color-blue pb1 pb3 lh-title pr2">Projects I'm working on</h2>
    </div>
    <div className="cf">
      <div className="fl w-100-m w-75-ns">
        <div className="br2 ma1 ml0 pb2">
          <div className="fr w-100 w-50-ns pl3-ns pb4">
            <div className="relative w-100">
              <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>Newfront Insurance</h2>
              <a href="https://www.newfrontinsurance.com" className="darken dim">
                <img className="w-100 br2" src="./assets/newfront-insurance-thumbnail.png" />
              </a>
            </div>
          </div>
          <p className="white pb2 lh-copy">
            After designing public health tools at {` `}
            <a href="https://iodine.com" className="white hover-pink" target="_blank">
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
            <a className="f6 link br1 ba color-pink hover-pink pa3 mv3 dib nowrap">
              See more of my work
            </a>
          </Link>
        </div>
      </div>
      <div className="fl w-100-m w-25-ns">
        <div className="fl w-100 w-50-m pa1">
          <div className="relative w-100">
            <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>Cousins The Podcast</h2>
            <a href="https://anchor.fm/cousins" className="darken dim">
              <img src="./assets/michael-luke.jpg" className="w-100 br2" style= {{ minHeight: "225px" }} />
            </a>
          </div>
        </div>
        <div className="fl w-100 w-50-m pa1">
          <div className="relative w-100">
            <h2 className="white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked" style={{ pointerEvents: "none", zIndex: 10 }}>Timelapse App</h2>
            <a href="https://github.com/michaelwschultz/timelapse-app" className="darken dim">
              <img src="./assets/timelapse-app-screenshot.jpg" className="w-100 br2" style={{ minHeight: "225px" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Intro