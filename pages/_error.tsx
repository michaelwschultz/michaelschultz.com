import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import Page from '../components/page'

export default () => (
  <Page>
    <Head>
      <title>Michael Schultz | Error</title>
    </Head>
    <Nav />

    <div className="mw8 center">
      <h1>Oops, nothing here.</h1>
    </div>
  </Page>
)
