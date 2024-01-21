/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brandOrange': 'hsl(26, 100%, 55%)',
        'paleOrange': 'hsl(25, 100%, 94%)',
        'veryDarkBlue': 'hsl(220, 13%, 13%)',
        'darkGrayishBlue': 'hsl(219, 9%, 45%)',
        'grayishBlue': 'hsl(220, 14%, 75%)',
        'lightGrayishBlue': 'hsl(223, 64%, 98%)',
        'white': 'hsl(0, 0%, 100%)'
      }
    },
    screens: {
      'sm': '320px',
      'md': '600px',
      'lg': '962px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}

