'use client'

import { useState } from 'react'
import Image from 'next/image'

const Hero = ({ heroFontStyles }) => {
  const hasAnimated = sessionStorage.getItem('heroHasAnimated')
  const [animate, setAnimate] = useState(false)

  if (!hasAnimated) {
    setAnimate(true)
    sessionStorage.setItem('heroHasAnimated', 'true')
  }

  return (
    <div className="relative overflow-hidden rounded-md bg-[#6D962A] p-10">
      <h1
        className={`${heroFontStyles} text-4xl font-bold uppercase tracking-tighter text-[#DBE8A8]
           opacity-0 lg:text-[114px] lg:leading-[114px] xl:text-[168px] xl:leading-[168px] ${
             animate ? 'fade-in-down-headline' : 'opacity-100'
           }`}
      >
        Michael Schultz
      </h1>
      <Image
        src="/static/images/michael_fullbody.png"
        alt="Michael Schultz"
        width={305}
        height={606}
        className={`absolute left-60 top-24 h-[606px] w-[305px] opacity-0 drop-shadow-2xl ${
          animate ? 'image-animate-on-load' : 'opacity-100'
        }`}
        priority
      />

      <p
        className={`pt-24 text-[#042C0E] opacity-0 xl:whitespace-pre ${
          animate ? 'fade-in-down' : 'opacity-100'
        }`}
      >
        {`Software designer and engineer \nwith a passion for creating— \nfrom innovative web \nsolutions to video games, \nmusic, and impactful \nsoftware projects.`}
      </p>
    </div>
  )
}

export default Hero
