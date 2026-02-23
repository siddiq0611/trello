/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        slate: {
          950: "#0a0f1e",
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.3)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
