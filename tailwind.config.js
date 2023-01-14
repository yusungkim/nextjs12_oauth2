/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom': '0 15px 3px -3px rgb(0 0 0 / 0.5)',
      }
    },
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
