/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aquaCyan: "#66FCF1",
        darkAqua: "#45A29E",
        darkGray: "#000000",
      },
    },
  },
  plugins: [],
};
