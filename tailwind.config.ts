import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        cream: "#F9F7F4",
        "cream-dark": "#F2EDE7",
        taupe: "#9B8B7A",
        "taupe-light": "#C4B5A8",
        "taupe-pale": "#E8DDD4",
        ink: "#2C2C2C",
        muted: "#6B6B6B",
      },
    },
  },
  plugins: [],
};

export default config;
