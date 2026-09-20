/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        smart: {
          blue: '#0084FF',
          blueDark: '#0055D4',
          cyan: '#00C8FF',
          green: '#00D06C',
          greenLight: '#00E891',
          slate: '#0E1729',
          dark: '#080C16',
          card: '#131D33',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
