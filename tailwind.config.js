import { colors } from "./constants/Colors";
/** @type {import('tailwindcss').Config} */
module.exports = {
  //* Always update this to include paths to all components files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
