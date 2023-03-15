/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindColorSafelist = require('./tailwind-color-safelist');

module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./stories/**/*.{js,ts,jsx,tsx}"],
  safelist: tailwindColorSafelist,
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        body: "#132226",
        primary: "#BE9063",
        secondary: "#525B56",
        highlight: "#A4978E"
      },
      fontFamily: {
        sora: ['"Sora"', ...defaultTheme.fontFamily.sans],
        lobster: ['"Lobster"', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        "3xl": "0 10px 10px  rgba(190, 144, 99,0.2)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
