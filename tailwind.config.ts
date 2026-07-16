import containerQueries from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {},
		extend: {
			aria: {
				current: 'current',
			},
			animation: {
				float: 'float 6s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translate3d(0px, -8px, 0)' },
					'50%': { transform: 'translate3d(0px, 8px, 0)' },
				},
			},
			boxShadow: {
				xs: '0px 1px 1px rgba(24, 24, 27, 0.06), 0px 0px 0px rgba(24, 24, 27, 0.08), 0px 0px 0px rgba(24, 24, 27, 0.08)',
				sm: '0px 2px 1px rgba(24, 24, 27, 0.01), 0px 1px 1px rgba(24, 24, 27, 0.05), 0px 1px 1px rgba(24, 24, 27, 0.09), 0px 0px 0px rgba(24, 24, 27, 0.1), 0px 0px 0px rgba(24, 24, 27, 0.1);',
				md: '0px 5px 2px rgba(24, 24, 27, 0.03), 0px 3px 2px rgba(24, 24, 27, 0.1), 0px 1px 1px rgba(24, 24, 27, 0.17), 0px 0px 1px rgba(24, 24, 27, 0.2), 0px 0px 0px rgba(24, 24, 27, 0.2);',
				lg: '0px 25px 7px rgba(24, 24, 27, 0.01), 0px 16px 6px rgba(24, 24, 27, 0.04), 0px 9px 5px rgba(24, 24, 27, 0.15), 0px 4px 4px rgba(24, 24, 27, 0.26), 0px 1px 2px rgba(24, 24, 27, 0.29), 0px 0px 0px rgba(24, 24, 27, 0.3);',
			},
			colors: {
				black: '#0a0e1a',
				white: '#ffffff',
				'astro-gray': {
					100: '#E8F0FE',
					200: '#B0C4E8',
					300: '#7A9AC4',
					400: '#4A6A90',
					500: '#2A3A50',
					600: '#1A2636',
					700: '#0F1824',
				},
				'astro-dark': {
					100: '#7A9AC4',
					300: '#2A3A50',
					400: '#141E2E',
					500: '#3A4A60',
					600: '#1E2A3A',
					700: '#0D1520',
					800: '#0A1018',
					900: '#060A10',
				},
				'astro-blue': '#3b82f6',
				'astro-purple': '#06b6d4',
				'astro-purple-dark': '#0e4d6e',
				'astro-red': '#ef4444',
				'astro-pink': {
					light: '#bae6fd',
					DEFAULT: '#38bdf8',
				},
				'astro-orange': '#f59e0b',
				'astro-yellow': '#fbbf24',
				'astro-hover': '#60a5fa',
				'astro-green': '#22d3ee',
			},
			backgroundImage: {
				'blue-purple-gradient': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
				'blue-green-gradient': 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
				'red-pink-gradient': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
				'orange-yellow-gradient': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
			},
			height: {
				header: '5rem',
			},
			lineHeight: {
				prose: '1.8125',
			},
			maxWidth: {
				prose: '768px',
			},
			zIndex: {
				blur: '-1',
				grid: '-2',
			},
		},
	},
	corePlugins: {
		container: false,
	},
	plugins: [
		// adds a `s-*` utility to apply the same width and height
		plugin(function sizePlugin(api) {
			api.matchUtilities(
				{ s: (value) => ({ width: value, height: value }) },
				{ values: api.theme('width') },
			);
		}),

		// adds `fluid-cols-*`, `fluid-cols-fit`, and `fluid-cols-fill` utilities
		plugin(function fluidColumnsPlugin(api) {
			api.matchUtilities(
				{
					'fluid-cols': (value) => ({
						gridTemplateColumns: `repeat(var(--fluid-cols-repeat, auto-fill), minmax(${value}, 1fr))`,
					}),
				},
				{ values: api.theme('width') },
			);

			api.addUtilities({
				'.fluid-cols-fit': { '--fluid-cols-repeat': 'auto-fit' },
				'.fluid-cols-fill': { '--fluid-cols-repeat': 'auto-fill' },
			});
		}),

		plugin(function astroComponentsPlugin({ addComponents, theme }) {
			addComponents({
				'i, em': {
					'@apply font-italic': {},
					fontSynthesis: 'none',
				},

				'b, strong': {
					'@apply font-strong': {},
					fontSynthesis: 'none',
					fontWeight: '700',
				},

				':focus-visible': {
					'@apply outline-astro-pink-light outline-offset-2': {},
				},

				'.container': {
					'@apply w-full mx-auto max-w-screen-xl px-4 md:px-8': {},
				},

				'.grid-container': {
					display: 'grid',
					gridTemplateColumns:
						'1fr min(var(--container-width, 1280px), calc(100% - (2 * var(--container-gutter-size, 24px)))) 1fr',
					gridColumnGap: 'var(--container-gutter-size, 24px)',
					overflow: 'clip',
					width: '100%',
					rowGap: theme('spacing.24'),
					paddingBottom: theme('spacing.24'),
					'@media screen(md)': {
						rowGap: theme('spacing.32'),
						paddingBottom: theme('spacing.32'),
					},
					'@media screen(lg)': {
						rowGap: theme('spacing.40'),
						paddingBottom: theme('spacing.40'),
					},

					/* center all children by default */
					'& > *': {
						gridColumn: '2',
					},

					/* allows content to bleed edge to edge */
					'& > .bleed-full': {
						gridColumn: '1 / -1',
					},

					/* allows content to bleed to starting edge */
					'& > .bleed-start': {
						gridColumn: '1 / 3',
					},

					/* allows content to bleed to ending edge */
					'& > .bleed-end': {
						gridColumn: '2 / -1',
					},

					'& > .bleed-none': {
						gridColumn: '2 !important',
					},
				},

				'.accordion': {
					'&::-webkit-details-marker': {
						display: 'none',
					},
				},

				'.heading-1': {
					'@apply font-heading text-5xl leading-tight': {},
					fontWeight: 'var(--heading-weight-normal)',
				},

				'.heading-2': {
					'@apply font-heading text-4xl leading-tight': {},
					fontWeight: 'var(--heading-weight-normal)',
				},

				'.heading-3': {
					'@apply font-heading text-2xl leading-tight': {},
					fontWeight: 'var(--heading-weight-normal)',
				},

				'.heading-4': {
					'@apply font-heading text-xl leading-tight': {},
					fontWeight: 'var(--heading-weight-normal)',
				},

				'.heading-5': {
					'@apply font-heading text-lg leading-tight': {},
					fontWeight: 'var(--heading-weight-normal)',
				},

				'.body': {
					'@apply font-sans text-base': {},
					'--sans-wght': '300',
					fontWeight: '300',
					'-webkit-font-smoothing': 'subpixel-antialiased',
				},
				'.body-large': {
					'@apply font-sans text-lg leading-normal': {},
					'--sans-wght': '200',
					fontWeight: '200',
					'-webkit-font-smoothing': 'subpixel-antialiased',
				},

				'.code': {
					'@apply font-mono font-light': {},
				},

				'.link': {
					'@apply transition-colors font-light text-astro-gray-200 hover:text-white duration-300 ease-out':
						{},
				},
				'.link-underline': {
					'@apply link border-b border-astro-gray-100 hover:border-astro-gray-300': {},
				},

				'.input': {
					'@apply rounded-lg border border-astro-gray-500 bg-astro-gray-600 p-3 leading-none shadow-inner':
						{},
				},
				'.input-textarea': {
					'@apply py-2 leading-normal': {},
				},

				'.landing-section': {
					'@apply flex flex-col items-center justify-center overflow-visible text-center': {},
				},

				'.bg-grid': {
					backgroundSize: '100px 100px',
					zIndex: theme('zIndex.grid'),
					backgroundImage: `url("/assets/bg-grid.png")`,
					backgroundPositionY: '-9px',

					maskImage: 'linear-gradient(to bottom, transparent, 10%, white, 90%, transparent)',
				},

				'.panel': {
					'@apply border border-astro-gray-500 bg-astro-gray-600 shadow-xl': {},
				},
			});
		}),

		plugin(function makeDBTypographyPlugin(api) {
			api.addUtilities({
				'.db .heading': {
					'@apply font-heading': {},
					fontFeatureSettings: "'salt' on, 'ss06' on, 'ss11' on, 'cv09' on, 'liga' on, 'calt' on",
					'font-variation-settings': `"wght" 475, "wdth" 490`,
				},
			});
		}),

		plugin(function maskGradientPlugin(api) {
			api.addUtilities({
				'.mask-radial-gradient': {
					maskImage: `radial-gradient(
												rgba(0, 0, 0, 0.8) 0%,
												rgba(0, 0, 0, 0.79) 5.64%,
												rgba(0, 0, 0, 0.761) 10.6%,
												rgba(0, 0, 0, 0.717) 14.9%,
												rgba(0, 0, 0, 0.66) 18.7%,
												rgba(0, 0, 0, 0.593) 22.2%,
												rgba(0, 0, 0, 0.518) 25.4%,
												rgba(0, 0, 0, 0.44) 28.5%,
												rgba(0, 0, 0, 0.36) 31.5%,
												rgba(0, 0, 0, 0.282) 34.6%,
												rgba(0, 0, 0, 0.207) 37.8%,
												rgba(0, 0, 0, 0.14) 41.3%,
												rgba(0, 0, 0, 0.083) 45.1%,
												rgba(0, 0, 0, 0.039) 49.4%,
												rgba(0, 0, 0, 0.01) 54.36%,
												rgba(0, 0, 0, 0) 60%
											)`,
				},
				'.mask-linear-gradient-to-b': {
					maskImage: 'linear-gradient(to bottom, white 0%, white 33%, transparent 90%)',
				},
			});
		}),

		containerQueries,

		plugin(function hocusPlugin(api) {
			api.addVariant(
				'hocus',
				'&:where(:hover, :focus-visible, :has(:focus-visible), .in-viewport)',
			);
			api.addVariant(
				'group-hocus',
				'.group:where(:hover, :focus-visible, :has(:focus-visible), .in-viewport) &',
			);
		}),
	],
} satisfies Config;
