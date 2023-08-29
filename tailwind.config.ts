import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'red-light': '#F75F64',
      red: '#F15156',
      green: '#3CDC8C',
      'red-dark': '#E44449',
      blue: '#0D3B66',
      white: '#FFFFFF',
      yellow: '#F4D35E',
      'yellow-dark': '#F27006',
      black: '#000000',
      background: '#FDECED',
      transparent: '#00000000',
      complemets: {
        text: '#8FA7B2',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
