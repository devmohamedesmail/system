/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#eb5e28', 
        secondary: '#14213d', 
        light: '#e5e5e5', 
      },
    },
  },
  plugins: [],
}

