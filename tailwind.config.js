import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,svx}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				blob: 'blob 10s infinite'
			},
			keyframes: {
				blob: {
					'0%, 100%': { transform: 'translate(0, 0) scale(1)' },
					'25%': { transform: 'translate(20px, -50px) scale(1.1)' },
					'50%': { transform: 'translate(0, 20px) scale(1)' },
					'75%': { transform: 'translate(-20px, -15px) scale(0.9)' }
				}
			},
			lineHeight: {
				11: '2.75rem',
				12: '3rem',
				13: '3.25rem',
				14: '3.5rem'
			},
			fontFamily: {
				sans: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
				hero: ['Antonio', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				primary: colors.green,
				gray: colors.gray
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						a: {
							color: theme('colors.primary.500'),
							'&:hover': { color: theme('colors.primary.600') },
							code: { color: theme('colors.primary.400') }
						},
						'h1,h2': {
							fontWeight: '700',
							letterSpacing: theme('letterSpacing.tight')
						},
						h3: { fontWeight: '600' },
						code: { color: theme('colors.indigo.500') }
					}
				},
				invert: {
					css: {
						a: {
							color: theme('colors.primary.500'),
							'&:hover': { color: theme('colors.primary.400') },
							code: { color: theme('colors.primary.400') }
						},
						'h1,h2,h3,h4,h5,h6': { color: theme('colors.gray.100') }
					}
				}
			})
		}
	},
	plugins: [forms, typography]
};
