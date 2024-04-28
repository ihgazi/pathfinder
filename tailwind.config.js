/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        gridTemplateColumns: {
            /* Template for grid board */
            '64': 'repeat(64, minmax(0, 1fr))',
            '32': 'repeat(32, minmax(0, 1fr))',
        }
    },
  },
  plugins: [],
}
