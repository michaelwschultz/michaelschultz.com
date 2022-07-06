import Head from 'next/head'

import Page from '../../components/page'
import PageNavigation from '../../components/PageNavigation'
import { NewfrontIcon } from '../../components/ui/icons'

const Newfront = () => {
  return (
    <Page>
      <Head>
        <title>Michael Schultz | Newfront</title>
      </Head>
      <PageNavigation
        action={{
          label: 'Visit',
          url: 'https://newfront.com',
          disabled: true,
        }}
        title='Newfront'
      />
      <main>
        <span className='py-8 flex justify-center'>
          <NewfrontIcon />
        </span>
        <div className='p-4'>
          <p>
            I spent 2017 - 2020 building Newfront, a modern insurance brokerage.
            I was the second engineer and first designer. The founders Spike and
            Gordon brought me onboard to help imagine and prototype the future
            of insurance.
          </p>
          <p>
            While at Newfront, I spent my time learning the status quo and what
            could be done to improve the insurance experience for insureds,
            brokers, and account managers. In that time, worked with people from
            all over the industry to build a company {`that’s`} one of the
            fastest growing brokerages in the country.
          </p>
          <p>
            I also dove deep into technologies I had only used on personal
            projects until this point, one being Next.js.
          </p>

          <p>Screen shots and more examples of what I’ve done here.</p>
        </div>
      </main>
    </Page>
  )
}

export default Newfront
