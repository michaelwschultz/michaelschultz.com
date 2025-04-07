import gamesData from "@/data/gamesData";
import Card from "@/components/Card";
import { genPageMetadata } from "app/seo";

export const metadata = genPageMetadata({ title: "Games" });

export default function Games() {
	return (
		<div className="divide-y divide-gray-200 dark:divide-gray-700">
			<div className="space-y-2 pb-8 pt-6 md:space-y-5">
				<h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
					Games
				</h1>
				<p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
					Games I've built with Rat Race Studio
				</p>
			</div>
			<div className="container py-12">
				<div className="-m-4 flex flex-wrap">
					{gamesData.map((d) => (
						<Card
							key={d.title}
							title={d.title}
							description={d.description}
							imgSrc={d.imgSrc}
							href={d.href}
							buttonText={d.buttonText}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
