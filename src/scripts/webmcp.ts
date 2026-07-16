// WebMCP: Expose site tools to AI agents via the browser
// See: https://webmachinelearning.github.io/webmcp/

if (typeof navigator !== 'undefined' && 'modelContext' in navigator) {
	try {
		(navigator as any).modelContext.provideContext({
			tools: [
				{
					name: 'browse_themes',
					description: 'Browse available website themes on IcebergMedia.co.uk',
					inputSchema: {
						type: 'object',
						properties: {
							category: {
								type: 'string',
								enum: ['free', 'premium', 'blog', 'ecommerce', 'landing-page', 'portfolio', 'docs'],
								description: 'Theme category to browse',
							},
						},
					},
					execute: async ({ category }: { category?: string }) => {
						const url = category
							? `https://themes.icebergmedia.co.uk/${category}/`
							: 'https://themes.icebergmedia.co.uk/themes/';
						return { url, message: `Browse ${category || 'all'} themes at ${url}` };
					},
				},
				{
					name: 'get_services',
					description: 'Get available web services from Iceberg Media',
					inputSchema: { type: 'object', properties: {} },
					execute: async () => {
						return {
							services: [
								{ name: 'Theme Setup', price: 'From £299', url: 'https://themes.icebergmedia.co.uk/services/theme-setup/' },
								{ name: 'Custom Design', price: 'From £1,499', url: 'https://themes.icebergmedia.co.uk/services/custom-design/' },
								{ name: 'SEO Optimisation', price: 'From £499/month', url: 'https://themes.icebergmedia.co.uk/services/seo-optimisation/' },
								{ name: 'Web Development', price: 'From £799', url: 'https://themes.icebergmedia.co.uk/services/web-development/' },
							],
						};
					},
				},
				{
					name: 'contact_us',
					description: 'Get contact information for Iceberg Media',
					inputSchema: { type: 'object', properties: {} },
					execute: async () => {
						return {
							phone: '+44 161 354 9017',
							whatsapp: '+44 7367 274 351',
							address: '14 Commercial St, Manchester M15 4PZ, United Kingdom',
							website: 'https://icebergmedia.co.uk',
							contactForm: 'https://themes.icebergmedia.co.uk/contact-us/',
						};
					},
				},
			],
		});
	} catch {
		// WebMCP not available, silently ignore
	}
}
