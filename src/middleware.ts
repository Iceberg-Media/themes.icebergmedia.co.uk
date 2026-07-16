import { defineMiddleware } from 'astro:middleware';
import TurndownService from 'turndown';

const turndown = new TurndownService({
	headingStyle: 'atx',
	codeBlockStyle: 'fenced',
});

// Remove scripts, styles, nav, footer from markdown output
turndown.addRule('remove-irrelevant', {
	filter: ['script', 'style', 'nav', 'footer', 'noscript', 'iframe'],
	replacement: () => '',
});

export const onRequest = defineMiddleware(async (context, next) => {
	const accept = context.request.headers.get('accept') || '';
	const wantsMarkdown = accept.includes('text/markdown');

	const response = await next();

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

	// Markdown for Agents: convert HTML to markdown
	if (wantsMarkdown && response.headers.get('content-type')?.includes('text/html')) {
		try {
			const html = await response.text();
			const markdown = turndown.turndown(html);
			return new Response(markdown, {
				status: response.status,
				headers: {
					'Content-Type': 'text/markdown; charset=utf-8',
					'X-Markdown-Tokens': 'true',
					'Vary': 'Accept',
					...Object.fromEntries(response.headers),
				},
			});
		} catch {
			// If conversion fails, return original response
		}
	}

	// X-Robots-Tag
	response.headers.set('X-Robots-Tag', 'max-image-preview:large');

	// Security headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	return response;
});
