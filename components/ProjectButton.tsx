import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
	onClick?: () => void;
	as: "button" | "a";
	href?: string;
	disabled?: boolean;
	buttonColor?: string;
}

export default function Button({
	onClick,
	children,
	as: Component = "button",
	disabled,
	buttonColor,
	href,
	...rest
}: Readonly<Props>) {
	return (
		<Component
			onClick={onClick}
			href={href}
			data-umami-event={`Clicked link ${href}`}
			className={`buttonColor flex flex-col items-center rounded-md p-4 transition-colors ${
				disabled || !href ? "bg-slate-800 hover:bg-slate-800" : "cursor-pointer"
			} ${buttonColor ?? "bg-orange-700 hover:bg-orange-600"}`}
			{...rest}
		>
			{children}
		</Component>
	);
}
