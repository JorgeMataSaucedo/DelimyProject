/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#F2DEA7',
        beige2: '#E8CEA0',
        salmon: '#FF8C7D',
        salmon2: '#E8A0AB',
      }
    },
  },
  plugins: [require("daisyui")],
}