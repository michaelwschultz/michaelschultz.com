import React from 'react'

const Friends = () => {
  return (
    <section className='mw8 center mv6'>
      <h3 className='white f5 pb3'>Designer friends</h3>
      <div className='grid'>
        <div className='relative hide-child'>
          <span
            className='child absolute padded-border b--white br2 h-100 w-100'
            style={{ pointerEvents: 'none', zIndex: 10 }}
          />
          <a href='http://twitter.com/brian_lovin'>
            <img src='./assets/friends/brian-lovin.jpg' alt='brian lovin' />
          </a>
        </div>
        <div className='relative hide-child'>
          <span
            className='child absolute padded-border b--white br2 h-100 w-100'
            style={{ pointerEvents: 'none', zIndex: 10 }}
          />
          <a href='http://twitter.com/anthonyshort'>
            <img src='./assets/friends/anthony-short.jpg' alt='anthony short' />
          </a>
        </div>
        <div className='relative hide-child'>
          <span
            className='child absolute padded-border b--white br2 h-100 w-100'
            style={{ pointerEvents: 'none', zIndex: 10 }}
          />
          <a href='http://twitter.com/superbryntendo'>
            <img src='./assets/friends/bryn-jackson.jpg' alt='bryn jackson' />
          </a>
        </div>
        <div className='relative hide-child'>
          <span
            className='child absolute padded-border b--white br2 h-100 w-100'
            style={{ pointerEvents: 'none', zIndex: 10 }}
          />
          <a href='http://twitter.com/kleinmaetschke'>
            <img
              src='./assets/friends/klein-maetschke.jpg'
              alt='klein maetschke'
            />
          </a>
        </div>
        <div className='relative hide-child'>
          <span
            className='child absolute padded-border b--white br2 h-100 w-100'
            style={{ pointerEvents: 'none', zIndex: 10 }}
          />
          <a href='http://twitter.com/luketns'>
            <img src='./assets/friends/luke-schultz.png' alt='luke schultz' />
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
