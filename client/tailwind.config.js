/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'wb-primary': '#146C94',
        'wb-secondary': '#19A7CE',
        'wb-accent': '#AFD3E2',
        'wb-base': '#F6F1F1',
      },
    },
  },
  plugins: [],
};