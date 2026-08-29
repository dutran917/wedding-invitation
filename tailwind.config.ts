import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FCFAF6",
          100: "#F8F5EE",
          200: "#F1EBE0",
          300: "#E6DBCB",
          DEFAULT: "#F9F6F0",
        },
        cream: {
          50: "#FAF7F2",
          100: "#F4EFE6",
          200: "#EAE2D3",
          300: "#D9CCB6",
          DEFAULT: "#F4EFE6",
        },
        gold: {
          100: "#F4EBD9",
          200: "#E5D2AF",
          300: "#D3B782",
          400: "#C2A676",
          500: "#A88B58",
          600: "#8E7240",
          700: "#6B552F",
          DEFAULT: "#C2A676",
        },
        espresso: {
          100: "#8C7F73",
          200: "#6B5F54",
          300: "#4D433A",
          400: "#362F28",
          500: "#241F1A",
          DEFAULT: "#2C2520",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', "Georgia", "serif"],
        script: ['"Alex Brush"', "cursive"],
        sans: ['"Montserrat"', "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
        ultra: ".35em",
      },
      boxShadow: {
        paper: "0 10px 30px -10px rgba(44, 37, 32, 0.08)",
        card: "0 20px 40px -15px rgba(44, 37, 32, 0.12)",
        gold: "0 8px 25px -5px rgba(194, 166, 118, 0.25)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
