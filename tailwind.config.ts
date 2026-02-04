/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A961',
          light: '#D4B876',
          dark: '#B8964D',
          50: '#FAF7F0',
          100: '#F5EFE1',
          200: '#EBE0C4',
          300: '#DFC99F',
          400: '#D4B876',
          500: '#C9A961',
          600: '#B8964D',
          700: '#9A7D3F',
          800: '#7C6432',
          900: '#5E4B26',
        },
        brand: {
          black: '#000000',
          cream: '#FFF5F5',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}