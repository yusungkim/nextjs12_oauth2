/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "--btn-text-case": "",
          info: "#3DB868",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "--btn-text-case": "",
          info: "#61cc85",
        }
      },
    ]
  },
}
