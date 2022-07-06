import Head from 'next/head'
import Image from 'next/image'

import Page from '../../components/page'
import PageNavigation from '../../components/PageNavigation'
import { TokoRokoIcon } from '../../components/ui/icons'

const TokoRoko = () => {
  return (
    <Page>
      <Head>
        <title>Michael Schultz | Toko Roko</title>
      </Head>
      <PageNavigation
        action={{
          label: 'Coming soon',
          disabled: true,
        }}
        title='Toko Roko'
      />
      <main>
        <span className='py-8 flex justify-center'>
          <TokoRokoIcon />
        </span>
        <div className='p-4'>
          <p>
            My cousin Luke Schultz and I both have wanted to build games for a
            long time. In 2021, we went from thinking about it, straight to the
            hardest part... starting. And I’m so glad we did.
          </p>
          <p>
            Toko Roko is a parkour inspired platformer for PC and consoles. It’s
            still a work-in-progress but has already come a long way since our
            initial prototypes.
          </p>
        </div>

        <div className='text-center'>
          <Image
            src='/assets/posts/tokoroko-wip.png'
            className='mx-auto'
            width='750'
            height='422'
            objectFit='scale-down'
            alt='Work in progress sketch of the Toko Roko platformer, where Toko is standing in the middle of a colorfuly clowdy world.'
          />

          <p className='-mt-8 text-xs '>Concept art by Luke</p>
        </div>

        <div className='p-4 pt-8'>
          <p>
            Luke has redesigned the main character (Toko) a couple times already
            and while a lot of the design will continue to evolve, we feel
            confident from our early prototyping that we’re on to something we
            want to eventually release.
          </p>

          <p>
            The hand drawn style of games like Hollow Knight, Cup Head, TK, and
            others inspired us to do something similar although we both love
            pixel art as well.
          </p>

          <p>
            Currently we have a bunch of placeholder art in place along with the
            latest iteration of our movement stystem. This, together with our
            sandbox level is already pretty fun mostly thanks to how the
            movement system {`let’s`} you switch between different “modes” of pk
            (parkour).
          </p>

          <p>
            By default, Toko can move and jump around the level like you would
            expect. However, hold the left trigger down and {`you’ll`} enter a
            sprint which gives you access to new types of jumps than before.
            Same if you instead hold the right trigger, now {`you’re`} in
            “percision mode” which allows you to stick a landing, for instance.
          </p>

          <p>
            {`We’re`} still ironing out the details but {`we’re`} excited to
            keep developing in our spare time and are planning on starting a
            devlog soon.
          </p>
        </div>
      </main>
    </Page>
  )
}

export default TokoRoko
