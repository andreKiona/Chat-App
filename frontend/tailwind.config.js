/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};

// export const content = ["./index.html/", "./src**/*.{js,jsx,ts,tsx}"];
// export const theme = {
//   extend: {},
// };
// export const plugins = [];
