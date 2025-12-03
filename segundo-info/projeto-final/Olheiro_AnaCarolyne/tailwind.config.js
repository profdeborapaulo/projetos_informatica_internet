/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-claro': '#3B82F6',
        'azul-medio': '#1E293B',
        'azul-tradicional': '#0F172A',
        'azul-arroxeado': '#1E1B4B',
      },
      fontFamily: {
        'instrumentsans': ['Instrument Sans', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      spacing: {
        '7': '1.75rem',
        '15': '3.75rem',
        '20.5': '5.125rem',
        '30': '7.5rem',
        '35': '8.75rem',
        '50': '12.5rem',
        '55': '13.75rem',
        '65': '16.25rem',
        '70': '17.5rem',
        '85': '21.25rem',
        '90': '22.5rem',
        '95': '23.75rem',
        '110': '27.5rem',
        '132': '33rem',
        '195': '48.75rem',
        '225': '56.25rem',
        '235': '58.75rem',
        '250': '62.5rem',
        '300': '75rem',
        '350': '87.5rem',
      },
      zIndex: {
        '500': '500',
        '1000': '1000',
        '1300': '1300',
        '9999': '9999',
      },
      borderWidth: {
        '5': '5px',
      },
    },
  },
  plugins: [],
}
