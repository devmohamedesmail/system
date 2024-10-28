/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CCFF00', 
        secondary: '#002642',
        light: '#14213d',
        // Light mode colors
        'light-mode': {
          DEFAULT: '#14213d', // Light mode primary color
        },
        // Dark mode colors
        'dark-mode': {
          DEFAULT: '#002642', // Dark mode primary color
        },
        
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

