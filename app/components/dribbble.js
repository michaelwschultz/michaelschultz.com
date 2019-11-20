import React from 'react'

const Dribbble = () => (
  <>
    <section id="sidewire" className="mw8 center mt5 ph2" style={{ minHeight: "100vh" }}>
      <ul className="shots flex flex-wrap" style={{ listStyle: "none", padding: 0 }}>
        <div className="tc">
          <span className="white">
            loading data from dribbble.com...
          </span>
        </div>
      </ul>
    </section>

    <section id="dribbble" className="mw8 center tc mb5">
      <a className="f6 link br1 ba ph3 pv3 dib color-pink hover-pink"
        href="http://dribbble.com/michaelschultz"
      >
        Check out my Dribbble page for more projects
      </a>
    </section>
  </>
)

export default Dribbble