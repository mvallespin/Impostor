/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'impostor-bg': '#252530',
        'impostor-surface': '#2f3140',
        'impostor-surface-soft': '#3a3d4f',
        'impostor-cream': '#fffef2',
        'impostor-cream-dark': '#f5f1e8',
        'impostor-text': '#1a1a1a',
        'impostor-text-secondary': '#4b5563',
        'impostor-text-on-dark': '#f3f4f8',
        'impostor-muted': '#b6bbcd',
        'impostor-red': '#c5a059',
        'impostor-red-dark': '#a88443',
        'impostor-red-light': '#d5b97d',
      },
      fontFamily: {
        'sans': ['Sora', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
