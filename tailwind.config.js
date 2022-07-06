/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#EFFCF7',
        'primary-200': '#A8C5A2',
        'primary-300': '#8AA08B',
        'primary-400': '#627963',
        'primary-500': '#33432B',
        'primary-600': '#273322',
        'primary-700': '#1C2519',
        'primary-800': '#182016',
        'secondary-100': '#FBFBE4',
        'secondary-200': '#D8DDAD',
        'secondary-300': '#767B5D',
      },
    },
  },
  plugins: [],
}
