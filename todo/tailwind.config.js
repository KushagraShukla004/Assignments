/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aquaCyan: "#51FBDE",
        darkAqua: "#00C2A7",
        darkGray: "#4A4453",
      },
    },
  },
  plugins: [],
};
