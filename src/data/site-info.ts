export type SocialLink = {
	text: string;
	label: string;
	icon: string;
	href: string;
	platform: string;
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
			href: 'https://x.com/iceberg_media',
			label: 'X.com',
			text: 'Follow Iceberg Media on X',
			showInHeader: true,
		},
		{
			platform: 'linkedin',
			icon: 'social/linkedin',
			label: 'LinkedIn',
			text: 'Follow Iceberg Media on LinkedIn',
			href: 'https://www.linkedin.com/company/iceberg-media/',
		},
		{
			platform: 'youtube',
			icon: 'social/youtube',
			label: 'YouTube',
			text: 'Follow Iceberg Media on YouTube',
			href: 'https://www.youtube.com/user/IcebergMediaUK',
		},
	],
};

export default siteInfo;
