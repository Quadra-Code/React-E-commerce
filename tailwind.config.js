
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./e-commerce/src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./e-commerce/src/**/*.{js,ts,jsx,tsx,mdx}",
    './e-commerce/public/index.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}