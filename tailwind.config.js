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
          ...require("daisyui/src/colors/themes")["[data-theme=cmyk]"],
          "--btn-text-case": "",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dracula]"],
          "--btn-text-case": "",
        }
      },
    ]
  },
}
