import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
	const accept = context.request.headers.get('accept') || '';
	const wantsMarkdown = accept.includes('text/markdown');

	return next().then((response) => {
		// Add Link headers for agent discovery (RFC 8288)
		response.headers.set(
			'Link',
			[
				'</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
				'</.well-known/agent-skills.json>; rel="service-doc"; type="application/json"',
				'</.well-known/mcp-server-card.json>; rel="service-desc"; type="application/json"',
				'</auth.md>; rel="service-doc"; type="text/markdown"',
				'</llms.txt>; rel="help"; type="text/plain"',
				'</sitemap-index.xml>; rel="sitemap"; type="application/xml"',
			].join(', '),
		);

		// Markdown for Agents: if Accept: text/markdown, add hint header
		if (wantsMarkdown) {
			response.headers.set('X-Markdown-Available', 'true');
			response.headers.set('Vary', 'Accept');
		}

		// X-Robots-Tag
		response.headers.set('X-Robots-Tag', 'max-image-preview:large');

		// Security headers
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

		return response;
	});
});
