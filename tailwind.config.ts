/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3A14C5",
          light: "#B09CFC",
          dark: "#292B5F",
        },
        green: {
          700: "#97EA98",
          800: "#44B043",
          900: "#086E06",
        },
        gray: {
          500: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};
