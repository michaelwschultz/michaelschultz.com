
import Head from 'next/head'

import Nav from '../components/nav'
import Page from '../components/page'

const ErrorPage = () => (
  <Page>
    <Head>
      <title>Michael Schultz | Error</title>
    </Head>
    <Nav />

    <section className='mw8 center mt6'>
      <div className='flex justify-between items-center'>
        <h2 className='white center'>Oops, something went wrong.</h2>
      </div>
    </section>
  </Page>
)

export default ErrorPage
