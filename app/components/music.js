import React from 'react'

const Music = () => (
  <section className="mw8 center mt6 ph3">
    <h2 className="color-blue pv2 pb3 lh-title">Music that’s been dominating my headphones this week</h2>
    <div className="flex items-center mb3">
      <a
        className="pr2"
        style={{ flexShrink: 0}}
        href="http://www.last.fm/user/michaelschultz"
      >
        <img src="./assets/record-player.svg" id="recordPlayer" width="24px" height="24px" />
      </a>
      <p id="currentSong" className="color-pink i f5">loading song data from last.fm...</p>
    </div>
    <div id="myLastFm" className="cf">
      <div id="firstArtist">
        {/* <!-- get first arists and make it bigger --> */}
      </div>
      <div id="artists">
        {/* <!-- get arists --> */}
      </div>
    </div>
  </section>
)
    
export default Music