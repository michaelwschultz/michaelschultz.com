import React from 'react'
import Head from 'next/head'
import Page from '../components/page'
import Dribbble from '../components/dribbble'

const Portfolio = props => {
  const { theme } = props;

  console.log('this is the theme', theme)

  return (
    <Page theme={theme}>
      <Head>
        <title>Michael Schultz</title>
      </Head>
      <Dribbble theme={theme} />
    </Page>
  )
}

export default Portfolio
