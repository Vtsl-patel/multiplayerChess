/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#0E2954',
        navBlue: '#1F6E8C',
        lightNeoBlue: '#2E8A99',
        customGrey: '#84A7A1',
      }
    },
  },
  plugins: [],
}

