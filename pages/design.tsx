import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import Page from '../components/page'
import Dribbble from '../components/dribbble'

const Design = () => (
  <Page>
    <Head>
      <title>Michael Schultz | Design work</title>
    </Head>
    <Nav />

    <Dribbble />
  </Page>
)

export default Design
