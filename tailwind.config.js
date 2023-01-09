/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide')
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=emerald]"],
          "--btn-text-case": "",
          "info-content": "#E6E6E6",
          "primary-focus": "#3DB868",
          "primary-content": "#EEEEEE",
        },
        // dark: {
        //   ...require("daisyui/src/colors/themes")["[data-theme=forest]"],
        //   "--btn-text-case": "",
        //   "--rounded-btn": "0.5rem",
        //   neutral: "#444444",
        // },
      },
    ]
  },
}
