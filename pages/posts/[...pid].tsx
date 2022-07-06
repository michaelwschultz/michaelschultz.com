import Head from 'next/head'

import { useRouter } from 'next/router'
import Page from '../../components/page'
import PageNavigation from '../../components/PageNavigation'

const ProjectPage = () => {
  const router = useRouter()
  const { pid } = router.query
  return (
    <Page>
      <Head>
        <title>Michael Schultz | {pid}</title>
      </Head>
      <PageNavigation />
      <main>
        <h1 className='p-4'>{pid}</h1>
      </main>
    </Page>
  )
}

export default ProjectPage
