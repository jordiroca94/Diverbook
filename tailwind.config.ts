import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      md: "768px", // tablet size
      lg: "1024px", // first standard size for desktop
      xlg: "1400px",
      bs: "1600px",
    },
    extend: {
      colors: {
        primary: "#00308F",
        secondary: "#4db5ff",
        darkBlue: "#002D62",
        green: "#52CC7A",
        red: "#ED4337",
        white: "#ffffff",
        black: "#000000",
        gray: "#707070",
        mediumGray2: "#c5c2bf",
        mediumGray: "#E8E9E8",
        lightGray: "#FCFCFC",
      },
      padding: {
        header: "76px",
      },
      minHeight: {
        header: "76px",
      },
    },
  },
  plugins: [],
};
export default config;
