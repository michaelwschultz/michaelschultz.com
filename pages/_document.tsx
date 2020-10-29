import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class extends Document {
  render = () => (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='Designing and building software in San Francisco, California. Currently building a modern insurance software at Newfront.'
        />
        <meta name='theme-color' content='#ffffff' />
        <link rel='icon' href='./favicon.ico' />
        <link rel='stylesheet' href='./tachyons.min.css' />
        <link rel='stylesheet' href='./style.css' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='./assets/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='./assets/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='./assets/favicon-16x16.png'
        />
        <link
          rel='mask-icon'
          href='./assets/safari-pinned-tab.svg'
          color='#23205f'
        />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
        `,
          }}
        />
      </Head>
      <body className='avenir bg-black'>
        <Main />
        <NextScript />
      </body>
      <style jsx>{`
        body {
          padding: 0;
          margin: 0;
        }
      `}</style>
    </Html>
  )
}
