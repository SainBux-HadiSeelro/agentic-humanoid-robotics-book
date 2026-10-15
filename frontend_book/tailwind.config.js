/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
    "./pages/**/*.{md,mdx}",
    "./node_modules/@docusaurus/core/lib/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@docusaurus/theme-classic/lib/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@docusaurus/theme-live-codeblock/lib/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@docusaurus/theme-search-algolia/lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}