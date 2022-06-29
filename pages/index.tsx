import Head from 'next/head'
import splitbee from '@splitbee/web'

import Page from '../components/page'

const Home = () => {
  splitbee.track('Viewed home page')

  return (
    <Page>
      <Head>
        <title>Michael Schultz | Product Designer & Engineer</title>
      </Head>
      <main>
        <div className='py-4 bg-primary-400'>
          <strong>Hi, I'm Michael</strong>
        </div>
      </main>
    </Page>
  )
}

export default Home
