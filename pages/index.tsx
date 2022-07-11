import Head from 'next/head'
import splitbee from '@splitbee/web'

import Page from '../components/page'
import PageNavigation from '../components/PageNavigation'
import Footer from '../components/footer'

type ProjectItem = {
  title: string
  description: string
  link: string
}

const Home = () => {
  splitbee.track('Viewed home page')

  const ProjectItem = (props: ProjectItem) => (
    <li>
      <a href={props.link} className='block p-4 hover:bg-primary-600'>
        <h3 className='font-semibold'>{props.title}</h3>
        <p className='m-0'>{props.description}</p>
      </a>
    </li>
  )

  const createPost = async () => {
    const response = await fetch('/api/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(response)
  }

  return (
    <Page>
      <Head>
        <title>Michael Schultz | Product Designer & Engineer</title>
      </Head>
      <PageNavigation title='Michael Schultz' />
      <main>
        <div className='p-4 bg-gradient-to-b from-primary-600 to-primary-700 shadow-2xl'>
          <h2 className='text-center'>Hi, {`I'm`} Michael</h2>
          <p className='py-4 font-normal'>
            {`I'm`} a software designer and developer. {`I'm`} currently
            building a tool that automates data entry. The Sensible API can be
            used by anyone to dramatically reduce the time it takes to intake
            documents into your system.
          </p>
        </div>

        <button onClick={createPost}>Create a post</button>

        <section className='py-4'>
          <h3 className='text-primary-200 font-semibold px-4'>Work</h3>
          <ul>
            <ProjectItem
              link='/work/sensible'
              title='Sensible'
              description='Document parsing automation platform'
            />
            <ProjectItem
              link='/work/newfront'
              title='Newfront'
              description='Modern insurance brokerage'
            />
            <ProjectItem
              link='/work/sidewire'
              title='Sidewire'
              description='Political discourse platform (shut down 2017)'
            />
            <ProjectItem
              link='/work/iodine'
              title='Iodine'
              description='Better medication ratings (acquired 2016)'
            />
          </ul>
        </section>

        <section className='py-4'>
          <h3 className='text-primary-200 font-semibold px-4'>Projects</h3>
          <ul>
            <ProjectItem
              link='/projects/tokoroko'
              title='Toko Roko'
              description='Parkour inspired platformer'
            />
            <ProjectItem
              link='/projects/dashly'
              title='Dashly'
              description='Presonalized API driven dashboard'
            />
          </ul>
        </section>

        <Footer />
      </main>
    </Page>
  )
}

export default Home
