import Image from 'next/image'
import { TwitterIcon, GithubIcon } from './ui/icons'

const Footer = () => {
  return (
    <footer className='footer relative'>
      <div className='absolute w-full p-4 bottom-0'>
        <div className='flex justify-between items-center'>
          <a
            href='https://twitter.com/michaelschultz'
            className='bg-primary-600 rounded-2xl p-6'
          >
            <TwitterIcon />
          </a>
          <a
            href='https://github.com/michaelwschultz'
            className='bg-primary-600 rounded-2xl p-6'
          >
            <GithubIcon />
          </a>
        </div>
      </div>

      <Image
        src='/assets/michael-schultz.png'
        className='mx-auto mix-blend-lighten'
        width='750'
        height='854'
        objectFit='scale-down'
        alt='photo of Michael Schultz'
      />
    </footer>
  )
}

export default Footer
