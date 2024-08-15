/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customgrey: "#f0f5fa",
        widgetbg: "#eef0f5",
        
      },
    },
  },
  plugins: [],
};
