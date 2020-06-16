import * as React from 'react'

const BlackLivesMatter = () => {
  return (
    <>
      <div className="blm-wrapper">
        <div className="blm-text">
          <div>
            <h1>BLACK</h1>
            <h1>LIVES</h1>
            <h1>MATTER</h1>
          </div>
        </div>
        <div className="blm">
          <a href="https://www.joincampaignzero.org/#vision">
            <img src="./assets/blm-tyler-pate.jpg" alt="Black Lives Matter" width="200%" height="200%" />
          </a>
        </div>
        <div className="blm-credit">
          <a href="https://dribbble.com/shots/11853647-Black-Lives-Matter">Art credit Tyler Pate</a>
        </div>
      </div>
      <style jsx>{`
        .backgroundImage {
          filter: blur(8px);
        }
        .wrapper {
          overflow: hidden;
        }

        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
        .blm-wrapper {
          position: relative;
          background-color: #121011;
          overflow: hidden;
        }
        .blm-text {
          align-items: center;
          display: flex;
          height: 100vh;
          justify-content: center;
          margin: -10%;
          position: relative;
          z-index: 1;
        }
        .blm-text h1 {
          color: #272526;
          font-family: 'Roboto', sans-serif;
          font-size: 72px;
          font-weight: 900;
          line-height: 80px;
          text-align: left;
        }
        .blm {
          z-index: 0;
          position: fixed;
          bottom: 0;
        }
        .blm-credit {
          text-align: right;
          position: fixed;
          bottom: 24px;
          right: 24px;
        }
        .blm-credit a {
          font-size: 12px;
          color: #272526;
        }
      `}</style>
    </>
  )
}

export default BlackLivesMatter