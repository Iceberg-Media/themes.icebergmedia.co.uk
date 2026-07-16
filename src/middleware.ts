import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
	return next().then((response) => {
		// Add Link headers for agent discovery (RFC 8288)
		response.headers.set(
			'Link',
			[
				'</.well-known/api-catalog>; rel="api-catalog"; type="application/json"',
				'</.well-known/agent-skills.json>; rel="service-doc"; type="application/json"',
				'</llms.txt>; rel="help"; type="text/plain"',
				'</sitemap-index.xml>; rel="sitemap"; type="application/xml"',
			].join(', '),
		);

		// Add X-Robots-Tag
		response.headers.set('X-Robots-Tag', 'max-image-preview:large');

		// Security headers
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

		return response;
	});
});
