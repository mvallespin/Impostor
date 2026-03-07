/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'impostor-cream': '#fffef2',
        'impostor-cream-dark': '#f5f1e8',
        'impostor-text': '#1a1a1a',
        'impostor-text-secondary': '#4b5563',
        'impostor-red': '#dc2626',
        'impostor-red-dark': '#991b1b',
        'impostor-red-light': '#ef4444',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
