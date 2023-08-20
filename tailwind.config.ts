import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme')
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        farsi: ['var(--font-sans)', ...fontFamily.sans],
        farsiAdad: ['var(--font-adad)', ...fontFamily.sans],
        farsiAdadBold: ['var(--font-adad-bold)', ...fontFamily.sans],
        farsiAdadReg: ['var(--font-adad-reg)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
