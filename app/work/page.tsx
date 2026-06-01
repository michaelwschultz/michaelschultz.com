import Link from "@/components/Link";
import workData from "@/data/workData";
import { genPageMetadata } from "app/seo";
import type { Metadata } from "next";

export const metadata: Metadata = genPageMetadata({ title: "Work" });

export default function Work() {
	return (
		<div className="divide-y divide-gray-200 dark:divide-gray-700">
			<div className="space-y-2 pb-8 pt-6 md:space-y-5">
				<h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
					Work
				</h1>
				<p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
					What I used to do, and what comes next
				</p>
			</div>

			<div className="prose prose-lg max-w-none py-10 dark:prose-invert">
				<p>
					I left the tech industry a while back and I am not looking to go back.
					I am still figuring out what my next chapter will be, and I plan on documenting
					part of that journey here.
				</p>
				<p>
					I am not proud of the work I did in tech anymore. I have come to
					question whether the industry is a net good at all. I absolutely most
					workers should unionize (including tech), and I think executive pay should be
					slashed to be more inline with workers. Not only because it's unfair and creates
					an imbalance of power in the world, but because it makes better businesses.
				</p>
				<p>
					The roles below are here only as a record of where I spent those
					years—not as something I am promoting or hoping to repeat.
				</p>
			</div>

			<div className="py-10">
				<h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
					Past roles
				</h2>
				<ul className="space-y-2 border-l border-gray-200 pl-4 dark:border-gray-700">
					{workData.map((job) => (
						<li
							key={job.title}
							className="text-sm text-gray-400 dark:text-gray-500"
						>
							{job.href ? (
								<Link
									href={job.href}
									className="hover:text-gray-600 dark:hover:text-gray-400"
									aria-label={job.title}
								>
									{job.title}
								</Link>
							) : (
								job.title
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
