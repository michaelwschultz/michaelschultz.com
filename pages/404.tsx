import React from 'react'
import Head from 'next/head'

import Nav from '../components/nav'
import Page from '../components/page'

export default () => (
  <Page>
    <Head>
      <title>Michael Schultz | Not found</title>
    </Head>
    <Nav />

    <section className="mw8 center mt6">
      <div className="flex justify-between items-center">
        <h2 className="white center">Oops, looks like this page doesn't exist.</h2>
      </div>
    </section>
  </Page>
)
