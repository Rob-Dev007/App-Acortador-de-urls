/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // o 'Poppins', 'Manrope'
      },
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo 600
          dark: '#4338CA',    // Indigo 700
          light: '#818CF8',   // Indigo 400 (para dark mode)
        },
        secondary: {
          DEFAULT: '#06B6D4', // Cyan 500
          light: '#22D3EE',   // Cyan 400
        },
        accent: {
          DEFAULT: '#10B981', // Verde 500
          light: '#34D399',   // Verde 400
        },
        lightBg: '#F9FAFB',
        lightText: '#111827',
        lightTextSecondary: '#4B5563',

        darkBg: '#111827',
        darkText: '#F9FAFB',
        darkTextSecondary: '#9CA3AF',
      },
    },
  },
  plugins: [],
}