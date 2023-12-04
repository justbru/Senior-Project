const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#f2ece1",
          100: "#D9C19D",
          200: "#B7966B",
          300: "#946D43",
          400: "#724A24",
          500: "#502B0F",
        },
        whitesmoke: "#f1f3f4"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

