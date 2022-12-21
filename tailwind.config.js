/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "white",
        primary: "#61DBFB",
      },
      boxShadow: {
        "3xl": "0 10px 10px  rgba(97, 219, 251,0.2)",
      },
    },
  },
  plugins: [],
};
