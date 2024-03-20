import Image from 'next/image'

const Hero = ({ heroFontStyles }) => {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-md bg-[#6D962A] p-6 md:p-10 lg:min-h-0">
      <h1
        className={`${heroFontStyles} fade-in-down-headline text-5xl font-bold uppercase tracking-tighter text-[#DBE8A8]
           opacity-0 md:text-[114px] lg:leading-[114px] xl:text-[168px] xl:leading-[168px]`}
      >
        Michael Schultz
      </h1>
      <div className="flex">
        <p
          className={`fade-in-down pr-20 pt-10 text-[#042C0E] opacity-0 md:max-w-[300px] md:pt-24 xl:whitespace-pre`}
        >
          {`Software designer and engineer \nwith a passion for creating— \nfrom innovative web \nsolutions to video games, \nmusic, and impactful \nsoftware projects.`}
        </p>
        <Image
          src="/static/images/michael_fullbody.png"
          alt="Michael Schultz"
          width={305}
          height={606}
          className={`image-animate-on-load absolute -bottom-10 right-0 w-[160px] opacity-0 drop-shadow-2xl md:right-48 md:top-24 md:w-[305px] xl:left-60`}
          priority
        />
      </div>
    </div>
  )
}

export default Hero
