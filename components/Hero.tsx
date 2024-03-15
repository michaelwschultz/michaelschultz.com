'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const Hero = ({ heroFontStyles }) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem('heroHasAnimated')
    if (!hasAnimated) {
      setAnimate(true)
      sessionStorage.setItem('heroHasAnimated', 'true')
    }
  }, [])

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
        className={`xs:-right-10 absolute right-0 top-0 h-[606px] w-[305px] opacity-0 drop-shadow-2xl xl:left-60 xl:top-24 ${
          animate ? 'image-animate-on-load' : 'opacity-100'
        }`}
        priority
      />

      <p
        className={`max-w-[300px] pt-24 text-[#042C0E] opacity-0 xl:whitespace-pre ${
          animate ? 'fade-in-down' : 'opacity-100'
        }`}
      >
        {`Software designer and engineer \nwith a passion for creating— \nfrom innovative web \nsolutions to video games, \nmusic, and impactful \nsoftware projects.`}
      </p>
    </div>
  )
}

export default Hero
