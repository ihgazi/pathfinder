/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js"
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
  plugins: [
      require('preline/plugin'),
  ],
}
