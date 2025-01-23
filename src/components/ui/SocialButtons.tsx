import { CONFIG } from "@/config";

const SocialButtons = () => {
	return CONFIG.socials.map((social) => {
		return (
			<a
				key={social.platform}
				href={social.link}
				target="_blank"
				rel="noreferrer"
				title={social.platform}
				className="cursor-pointer border group hover:border-secondaryDarker duration-200 rounded px-1.5 py-1 border-neutral-800 items-center flex"
			>
				{social.icon}
			</a>
		);
	});
};

export default SocialButtons;
