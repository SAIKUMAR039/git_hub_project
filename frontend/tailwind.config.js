/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          850: "#1a202c",
          900: "#0d1117",
          800: "#161b22",
          700: "#21262d",
          600: "#30363d",
          500: "#484f58",
          400: "#8b949e",
          300: "#c9d1d9",
          200: "#e6edf3",
        },
        blue: {
          600: "#2563eb",
          500: "#3b82f6",
          400: "#60a5fa",
        },
      },
    },
  },
  plugins: [],
};
