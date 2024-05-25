import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'dark-1': '#15131b',
        'dark-2': '#121212',
        'color-main': 'rgb(var(--rgb))',
        'bg-main': 'rgb(var(--background-rgb))',
        'primary-color': 'rgb(var(--primary-color))',
        'secondary-color': 'rgb(var(--secondary-color))',
        'background-color': 'rgb(var(--background-color))',
        'foreground-color': 'rgb(var(--foreground-color))',
        'accent-1': 'rgb(var(--accent-1))',
        'accent-2': 'rgb(var(--accent-2))',
        'accent-3': 'rgb(var(--accent-3))',
        'royalblue': '#4169e1'
      },
      animation: {
        popup: 'popup 500ms cubic-bezier(0, 0, 0.2, 1) 1'
      }
    },
  },
  plugins: [],
};
export default config;
