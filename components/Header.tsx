import siteMetadata from "@/data/siteMetadata.mjs";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import Logo from "./Logo";

const Header = () => {
	return (
		<header className="flex items-center justify-between py-10">
			<div>
				<Link href="/" aria-label={siteMetadata.headerTitle}>
					<div className="flex items-center justify-between">
						<div className="mr-3">
							<Logo />
						</div>
						{typeof siteMetadata.headerTitle === "string" ? (
							<div className="hidden h-6 text-2xl font-semibold sm:block" />
						) : (
							siteMetadata.headerTitle
						)}
					</div>
				</Link>
			</div>
			<div className="flex items-center space-x-4 leading-5 sm:space-x-6">
				{headerNavLinks
					.filter((link) => link.href !== "/")
					.map((link) => (
						<Link
							key={link.title}
							href={link.href}
							className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
						>
							{link.title}
						</Link>
					))}
				<SearchButton />
				{/* <ThemeSwitch /> */}
				<MobileNav />
			</div>
		</header>
	);
};

export default Header;
