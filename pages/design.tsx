import Head from 'next/head'
import splitbee from '@splitbee/web'

import Nav from '../components/nav'
import Page from '../components/page'
import Dribbble from '../components/dribbble'

const Design = () => {
  splitbee.track('Viewed design page')

  return (
    <Page>
      <Head>
        <title>Michael Schultz | Design work</title>
      </Head>
      <Nav />

      <Dribbble />
    </Page>
  )
}

export default Design
