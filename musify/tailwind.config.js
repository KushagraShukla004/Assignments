/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#121212",
        actionColor: "#18D860",
      },
      screens: {
        phone: "460px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
