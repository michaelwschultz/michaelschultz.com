import Hero from "@/components/Hero";
import Link from "@/components/Link";
import ProjectCard from "@/components/ProjectCard";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata.mjs";
import { formatDate } from "pliny/utils/formatDate";

const MAX_DISPLAY = 2;

export default function Home({ posts, heroFontStyles }) {
	return (
		<div className="relative">
			{/* NOTE: Animations might be a little much, also animate-blob is on a second line to get around prettier ordering error */}
			<div
				className={
					"absolute -left-60 top-20 h-[380px] w-[380px] rounded-full bg-[#E2EFB0] opacity-5 blur-3xl filter" +
					"animate-blob"
				}
			/>
			<div
				className={
					"absolute -right-20 top-60 h-[380px] w-[380px] rounded-full bg-[#B9FF46] opacity-5 blur-3xl filter" +
					"animate-blob"
				}
			/>

			<Hero heroFontStyles={heroFontStyles} />

			{/* PROJECTS - move to component */}
			<div className="flex flex-wrap gap-4 pt-24">
				<ProjectCard
					title="Light The Night ✨"
					href="https://ratracestudio.itch.io/light-the-night"
					buttonText="Play Game"
					buttonColor="bg-[#0f175a] hover:bg-[#141c64]"
				>
					A modern take on the one-button infinite runner. Travel across a
					lively pond while collecting more light to hold back the encroching
					night.
					<span className="block pt-4">
						If nothing else, check it out for the good vibes.
					</span>
				</ProjectCard>
				<ProjectCard
					title="Prism Quest 🔮"
					href="https://ratracestudio.itch.io/prism-quest"
					buttonText="Play Game"
					buttonColor="bg-[#6BB0D4] hover:bg-[#8BCEF1]"
				>
					Our kaizo inspired platformer built for the 2024 1-Bit game jam where
					we placed 20th out of 108 entries.
					<span className="block pt-4">
						Many have tried, few have overcome. Will you?
					</span>
				</ProjectCard>
				<ProjectCard
					title="Pack Rat 🐭"
					href="https://ratracestudio.itch.io/pack-rat"
					buttonText="Play Game"
					buttonColor="bg-green-800 hover:bg-green-700"
				>
					A point-and-click adventure game built for the Cozy Autumn Game Jam
					2023.
					<span className="block pt-4">
						The game was designed and built in 8 days and lots of coffee. This
						was also the first ever game published by{" "}
						<Link href="https://ratrace.studio">RatRace.studio</Link>
					</span>
				</ProjectCard>
				<ProjectCard
					title="Hemolog 2.0"
					href="https://hemolog.com"
					buttonText="Try Now"
					buttonColor="bg-[#FF1E68] hover:bg-[#FF4D9E]"
				>
					A free health tracking tool for people with Hemophilia, rebuilt from
					the ground up to be simple and more insightful than ever.
				</ProjectCard>
				<ProjectCard title="(Ph)one Stand" buttonText="Available Soon">
					Tired of not having a quality phone stand that rotated nicely with one
					hand, I decided to design my own. Made with strong, recyclable
					plastics and eco-friendly Jesmonite.
				</ProjectCard>
				<ProjectCard title="Time Between The Stars" buttonText="Coming Soon">
					Space simulation game influenced by the short story{" "}
					<Link href="https://www.amazon.com/Slow-Between-Stars-Reaches-collection-ebook/dp/B0C4QX2FSF">
						Slow Time Between The Stars by John Scalzi
					</Link>
					.
				</ProjectCard>
				<ProjectCard title="Toko Roko" buttonText="Coming Soon">
					Hand drawn parkour platformer for PC and consoles.
					<span className="block pt-4">
						This will be the first full-length game from{" "}
						<Link
							href="https://ratrace.studio"
							data-umami-event={"Clicked link https://ratrace.studio"}
						>
							RatRace.studio
						</Link>
						, a collaboration with{" "}
						<Link
							href="https://luketns.com"
							data-umami-event={"Clicked link https://luketns.com"}
						>
							Luke Schultz
						</Link>
						.
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
					{!posts.length && "No posts found."}
					{posts.slice(0, MAX_DISPLAY).map((post) => {
						const { slug, date, title, summary, tags } = post;
						return (
							<li key={slug} className="py-12">
								<article>
									<div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
										<dl>
											<dt className="sr-only">Published on</dt>
											<dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
												<time dateTime={date}>
													{formatDate(date, siteMetadata.locale)}
												</time>
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
						);
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
		</div>
	);
}
