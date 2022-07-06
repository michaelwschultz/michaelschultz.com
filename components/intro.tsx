import Link from 'next/link'
import Image from 'next/image'

const Intro = () => {
  return (
    <section className='mw8 center mt5'>
      <div className='flex justify-between items-center'>
        <h2 className='white'>Howdy, {`I'm`} Michael.</h2>
      </div>
      <div className='cf'>
        <div className='fl w-100-m'>
          <div className='br2 ma1 ml0 pb2'>
            <div className='fr w-100 w-50-ns pl3-ns pb4'>
              <div className='relative w-100 hide-child'>
                <span
                  className='child absolute padded-border b--white br2 h-100 w-100'
                  style={{ pointerEvents: 'none', zIndex: 10 }}
                />
                <a
                  href='https://www.newfront.com'
                  rel='noreferrer'
                  className='darken'
                  target='_blank'
                >
                  <h2
                    className='white absolute pa1 bottom-0 pl3 f6 fw4 ttu tracked'
                    style={{ pointerEvents: 'none', zIndex: 10 }}
                  >
                    Newfront Insurance
                  </h2>
                  <Image
                    width='494'
                    height='312'
                    priority
                    className='w-100 br2'
                    src='/assets/newfront-insurance-thumbnail.png'
                    alt='newfront insurance'
                  />
                </a>
              </div>
            </div>
            <p className='white pb2 lh-copy'>
              After designing public health tools at {` `}
              <a
                href='https://iodine.com'
                rel='noreferrer'
                className='white hover-purple'
                target='_blank'
              >
                Iodine
              </a>
              , and a quick dip into politics at Sidewire, I joined{' '}
              <a
                className='white hover-blue'
                href='https://www.newfront.com'
                rel='noreferrer'
                target='_blank'
              >
                Newfront
              </a>
              {` `}
              Insurance in December of 2017 to help design and build a modern
              insurance brokerage.
            </p>
            <p className='white pb2 lh-copy'>
              At Newfront, I created tools that make life easier for brokers,
              their clients, and Newfront account managers. Some of these tools
              included automation and others improved the communication process
              between each group.
            </p>
            <p className='white pb2 lh-copy'>
              After several years at Newfront, and helping grow the team from 7
              to 200+, I left to take a short break during 2020.
            </p>
            <p className='white pb2 lh-copy'>
              After recharging I joined{' '}
              <a
                className='white hover-dark-red'
                href='https://www.sensible.so'
                rel='noreferrer'
                target='_blank'
              >
                Sensible
              </a>
              . {`We're`} building incredible tools that deliver a mind blowing
              developer experience for generating structured data from physical
              documents.
            </p>
            <Link href='/design'>
              <a className='green hover-white f6 link br1 ba hover pa3 mv3 dib nowrap'>
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
