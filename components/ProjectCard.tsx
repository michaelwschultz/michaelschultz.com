import { ReactNode } from 'react'
import Image from './Image'
import Link from './Link'
import ProjectButton from './ProjectButton'

interface Props {
  title: string
  imgSrc?: string
  href?: string
  children?: ReactNode
  buttonText: string
  buttonColor?: string
}

const ProjectCard = ({ title, imgSrc, href, children, buttonText, buttonColor }: Props) => (
  <div className="project-card-blur relative w-full md:w-1/2 md:max-w-[348px] xl:w-1/3 xl:max-w-[330px]">
    <div className="flex h-full flex-col justify-between p-6">
      <div className="pb-8">
        {imgSrc && (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        )}
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`} data-umami-event={`Clicked ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{children}</p>
      </div>
      <ProjectButton as="a" href={href} buttonColor={buttonColor}>
        {buttonText}
      </ProjectButton>
    </div>
  </div>
)

export default ProjectCard
