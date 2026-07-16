export type SocialLink = {
	/** Longer descriptive label, e.g. `"Join the Astro community on Discord"` */
	text: string;
	/** Short label with the name of the platform, e.g. `"Discord"`*/
	label: string;
	/** Icon name for use with `astro-icon`, e.g. `"social/discord"`. */
	icon: string;
	/** URL for our profile on the external platform. */
	href: string;
	/** Platform ID, e.g. `"discord"`. Used for `astro.build/on/PLATFORM` redirects. */
	platform: string;
	/** Whether this platform should be linked in the site header */
	showInHeader?: boolean;
};

type SiteInfo = {
	name: string;
	title: string;
	description: string;
	image: {
		src: string;
		alt: string;
	};
	socialLinks: SocialLink[];
};

const siteInfo: SiteInfo = {
	name: 'IcebergMedia.co.uk',
	title: 'Find Your Perfect Website Theme',
	description:
		'Browse premium and free website themes. Let Iceberg Media set up, customise, and launch your site with the theme you love.',
	image: {
		src: '/og/social.jpg',
		alt: 'IcebergMedia.co.uk - Website Themes',
	},
	socialLinks: [
		{
			platform: 'twitter',
			icon: 'social/twitter',
			href: 'https://x.com/icebergmedia',
			label: 'X.com',
			text: 'Follow Iceberg Media on X',
			showInHeader: true,
		},
		{
			platform: 'linkedin',
			icon: 'social/linkedin',
			label: 'LinkedIn',
			text: 'Follow Iceberg Media on LinkedIn',
			href: 'https://www.linkedin.com/company/icebergmedia',
		},
	],
};

export default siteInfo;
