/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        righteous: ["Righteous", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        belgrano: ["Belgrano", "serif"],
        poppins: ["Poppins", "sans-serif"],
        poltawski: ["Poltawski Nowy", "serif"],
        montaga: ["Montaga", "serif"],
        gentiumBook: ["Gentium Book Basic", "serif"],
      },
      
    },
  },
  plugins: [],
};
