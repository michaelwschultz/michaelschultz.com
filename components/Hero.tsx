import Image from 'next/image'

const Hero = ({ heroFontStyles }) => {
  return (
    <div className="relative overflow-hidden rounded-md bg-[#6D962A] p-10">
      <h1
        className={`${heroFontStyles} fade-in-down-headline text-4xl font-bold uppercase tracking-tighter text-[#DBE8A8]
           opacity-0 lg:text-[114px] lg:leading-[114px] xl:text-[168px] xl:leading-[168px]`}
      >
        Michael Schultz
      </h1>
      <Image
        src="/static/images/michael_fullbody.png"
        alt="Michael Schultz"
        width={305}
        height={606}
        className={`image-animate-on-load xs:-right-10 absolute right-0 top-0 h-[606px] w-[305px] opacity-0 drop-shadow-2xl xl:left-60 xl:top-24`}
        priority
      />

      <p
        className={`fade-in-down pt-24 text-[#042C0E] opacity-0 *:max-w-[300px] xl:whitespace-pre`}
      >
        {`Software designer and engineer \nwith a passion for creating— \nfrom innovative web \nsolutions to video games, \nmusic, and impactful \nsoftware projects.`}
      </p>
    </div>
  )
}

export default Hero
