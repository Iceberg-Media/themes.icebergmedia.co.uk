// @ts-check

import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig, sessionDrivers } from 'astro/config';
import astroExpressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import houston from './houston.theme.json';

const PRODUCTION_BRANCH = 'main';
const PREVIEW_SITE =
	process.env.WORKERS_CI_BRANCH && process.env.WORKERS_CI_BRANCH !== PRODUCTION_BRANCH
		? `https://${process.env.WORKERS_CI_BRANCH}.previews.astro.build`
		: undefined;

// https://astro.build/config
export default defineConfig({
	site: PREVIEW_SITE || 'https://themes.icebergmedia.co.uk',
	prefetch: true,
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		astroExpressiveCode({
			themes: [houston],
			shiki: { engine: 'javascript' },
			styleOverrides: {
				borderRadius: '0.375rem',
				borderColor: 'rgb(84 88 100)',
			},
			defaultProps: {
				overridesByLang: {
					'bash,sh,shell': {
						frame: 'none',
					},
				},
			},
		}),
		icon({
			svgoOptions: {
				plugins: [
					{ name: 'preset-default' },
					{
						name: 'prefixIds',
						params: { prefix: () => Math.round(Math.random() * 1_000_000_000).toString(36) },
					},
				],
			},
		}),
		mdx({ optimize: true }),
		sitemap({
			filter: (page) => !page.includes('/showcase/') && !page.includes('/agencies/') && !page.includes('/case-studies/') && !page.includes('/press/') && !page.includes('/partnerships/') && !page.includes('/wallpapers/') && !page.includes('/telemetry/') && !page.includes('/newsletter/') && !page.includes('/integrations/') && !page.includes('/on/') && !page.includes('/themes/details/') && !page.includes('/themes/author/') && !page.includes('/themes/submit/') && !page.includes('/themes/[page]') && !page.includes('/404'),
		}),
	],
	image: {
		domains: ['v1.screenshot.11ty.dev', 'storage.googleapis.com', 'avatars.githubusercontent.com'],
	},
	vite: {
		ssr: {
			noExternal: ['smartypants'],
		},
		optimizeDeps: {
			include: [
				'astro-icon > @iconify/utils > debug',
				'astro-expressive-code/components',
				'astro-expressive-code>hast-util-select',
				'astro-expressive-code>rehype',
				'astro-expressive-code>unist-util-visit',
				'astro-expressive-code>rehype-format',
				'astro-expressive-code>hastscript',
				'astro-expressive-code>hast-util-from-html',
				'astro-expressive-code>hast-util-to-string',
				'astro-expressive-code>@expressive-code/core>postcss',
				'astro-expressive-code>@expressive-code/core>postcss-nested',
			],
		},
	},
	adapter: cloudflare({
		imageService: 'passthrough',
	}),
	session: { driver: sessionDrivers.lruCache() },
	experimental: {
		contentIntellisense: true,
	},
});
