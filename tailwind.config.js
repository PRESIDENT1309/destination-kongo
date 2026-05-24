/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*/.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kongo: {
          gold: '#D4AF37',
          blue: '#002F6C',
        }
      }
    },
  },
  plugins: [],
}