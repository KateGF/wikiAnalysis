/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'darkBlue': '#002855',
        'red': '#EF3340',
        'blue': '#1e40af',
        'gris': '#FAFAF5',
        'grisBorde': '#E6E6E6',
        'grisMed': '#78716c'
      },
      
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      }
    }
    
  },
  plugins: [],
}

