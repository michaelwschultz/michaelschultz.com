import Head from 'next/head'
import Image from 'next/image'

import Page from '../../components/page'
import PageNavigation from '../../components/PageNavigation'
import { ArrowDownFast, SensibleIcon } from '../../components/ui/icons'

const Sensible = () => {
  return (
    <Page>
      <Head>
        <title>Michael Schultz | Sensible</title>
      </Head>
      <PageNavigation
        action={{
          label: 'Try for free',
          url: 'https://sensible.so',
          disabled: true,
        }}
        title='Sensible'
      />
      <main>
        <span className='py-8 flex justify-center'>
          <SensibleIcon />
        </span>
        <div className='p-4'>
          <p>
            Parsing documents is still a fact of life for many companies. Wether
            {`it’s`} adding a new customer to your system or documenting an
            insurance claim. The truth is, much of this cruital data still is
            passed around via PDFs.
          </p>
          <p>
            At Sensible, {`we’ve`} created an API can be used by anyone to
            dramatically reduce the time it takes to intake documents into your
            system.
          </p>
          <p>
            I joined Sensible as the second hire because I saw the need for what{' '}
            {`we’ve`} built first hand at Newfront, a modern insurance company I
            helped build.
          </p>
        </div>

        <div className='pt-8 text-center'>
          <Image
            src='/assets/posts/sensible-illustration.png'
            className='mx-auto'
            width='912'
            height='396'
            objectFit='scale-down'
            alt='illustration of physical document being parsed'
          />

          <p className='-mt-8 text-xs '>Sensible API to JSON</p>

          <span className='flex justify-center text-primary-200 pb-4'>
            <ArrowDownFast />
          </span>
        </div>

        <blockquote className='p-4 bg-primary-800'>
          <pre>
            {`
  {
    document_type: w_9,
    data: {
      name: Michael Schultz,
      company: Sensible,
      company_type: C Corportation,
      ...
    }
  }`}
          </pre>
        </blockquote>

        <div className='p-4 pt-8'>
          <p>More to come here...</p>
        </div>
      </main>
    </Page>
  )
}

export default Sensible
