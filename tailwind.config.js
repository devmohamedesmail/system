/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4c0054', 
        secondary: '#fca311',
        light: '#d8d3e2',
        
  



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

