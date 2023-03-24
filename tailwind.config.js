/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        'JetBrains-Mono': ['JetBrains Mono', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 2px 8px rgba(0, 0, 0, 0.26)',
      },
    },
  },
  plugins: [],
};
