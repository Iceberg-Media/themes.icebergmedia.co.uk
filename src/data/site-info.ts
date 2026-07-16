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
	title: 'Free & Premium Website Themes | Professional Theme Setup UK',
	description:
		'Browse 200+ free and premium website themes for blogs, portfolios, e-commerce, and landing pages. Professional theme setup and customisation by Iceberg Media. Manchester, UK.',
	image: {
		src: '/og/social.jpg',
		alt: 'IcebergMedia.co.uk - Free and Premium Website Themes UK',
	},
	socialLinks: [
		{
			platform: 'twitter',
			icon: 'social/twitter',
			href: 'https://x.com/iceberg_media',
			label: 'X.com',
			text: 'Follow Iceberg Media on X',
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
