/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4c0054', 
        secondary: '#d8d3e2',
        // secondary: '#002642',
        light: '#14213d',
        // Light mode colors
        'light-mode': {
          DEFAULT: '#4c0054', 
        },
        // Dark mode colors
        'dark-mode': {
          DEFAULT: '#002642', 
        },
        
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

