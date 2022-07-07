import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='Designing and building software in San Francisco, California. Currently building data extraction tools at Sensible.'
        />
        <meta name='theme-color' content='#ffffff' />
        <link rel='icon' href='./favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap'
          rel='stylesheet'
        />
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
