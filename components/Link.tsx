/* eslint-disable jsx-a11y/anchor-has-content */
import Link from "next/link";
import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

const CustomLink = ({
	href,
	...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
	const isInternalLink = href?.startsWith("/");
	const isAnchorLink = href?.startsWith("#");

	if (isInternalLink) {
		return <Link href={href} {...rest} />;
	}

	if (isAnchorLink) {
		return (
			<a href={href} {...rest}>
				{rest.children}
			</a>
		);
	}

	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			href={href}
			{...rest}
			data-umami-event={`Clicked link ${href}`}
		>
			{rest.children}
		</a>
	);
};

export default CustomLink;
