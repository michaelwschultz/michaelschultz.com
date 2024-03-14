import Image from 'next/image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import ProjectCard from '@/components/ProjectCard'

const MAX_DISPLAY = 1

export default function Home({ posts, heroFontStyles }) {
  return (
    <>
      <div className="relative overflow-hidden rounded-md bg-[#6D962A] p-10">
        <Image
          src="/static/images/michael_fullbody.png"
          alt="Michael Schultz"
          width={305}
          height={606}
          className="absolute left-60 top-24 h-[606px] w-[305px]"
        />
        <h1
          className={`${heroFontStyles} text-4xl font-bold uppercase tracking-tighter text-[#DBE8A8] lg:text-[114px] lg:leading-[114px] xl:text-[168px] xl:leading-[168px]`}
        >
          Michael Schultz
        </h1>
        <p className="pt-24 text-[#042C0E] xl:whitespace-pre">
          {`Software designer and engineer \nwith a passion for creating— \nfrom innovative web \nsolutions to video games, \nmusic, and impactful \nsoftware projects.`}
        </p>
      </div>

      {/* PROJECTS - move to component */}
      <div className="flex flex-wrap gap-4 pt-24">
        <ProjectCard
          title="Hemolog 2.0"
          href="https://hemolog.com"
          buttonText="Try Now"
          buttonColor="bg-green-800 hover:bg-green-700"
        >
          A free health tracking tool for people with Hemophilia, rebuilt from the ground up to be
          simple and more insightful than ever.
        </ProjectCard>
        <ProjectCard title="(Ph)one Stand" buttonText="Available Soon">
          Tired of not having a quality phone stand that rotated nicely with one hand, I decided to
          design my own. Made with strong, recyclable plastics and eco-friendly Jesmonite.
        </ProjectCard>
        <ProjectCard
          title="Pack Rat"
          href="https://tokoroko.itch.io/pack-rat"
          buttonText="Coming Soon"
          buttonColor="bg-green-800 hover:bg-green-700"
        >
          A point-and-click adventure built for the Cozy Autumn Game Jam 2023.
          <span className="block pt-4">
            The game was designed and built in 8 days and lots of coffee. This was also the first
            ever game published by <Link href="https://ratrace.studio">RatRace.studio</Link>
          </span>
        </ProjectCard>
        <ProjectCard title="Time Between The Stars" buttonText="Coming Soon">
          Space simulation game influenced by the short story{' '}
          <Link href="https://www.amazon.com/Slow-Between-Stars-Reaches-collection-ebook/dp/B0C4QX2FSF">
            Slow Time Between The Stars by John Scalzi
          </Link>
          .
        </ProjectCard>
        <ProjectCard title="Toko Roko" buttonText="Coming Soon">
          Hand drawn parkour platformer for PC and consoles.
          <span className="block pt-4">
            This will be the first official game from{' '}
            <Link href="https://ratrace.studio">RatRace.studio</Link> a collaboration between me and
            Luke Schultz.
          </span>
        </ProjectCard>
      </div>

      <div className="divide-y divide-gray-200 pt-20 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
            Latest thoughts
          </h1>
        </div>
        {/* POSTS */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/thoughts/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/thoughts/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/thoughts"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
