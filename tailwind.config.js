/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blanco: '#ffffffff',

        whrite: {
          100: '#2c2d2dff',
          

        },

        // Aquí definimos el "Celeste Jefa"
        // Usaremos 'sky' (cielo) que es más suave que cyan
        celeste: {
          50: '#f0f9ff', // Fondo muy clarito
          100: '#e0f2fe', // Fondo suave
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // El color principal
          600: '#0284c7', // Para botones hover
          700: '#0369a1',
          800: '#075985',
          900: '#307aa5ff', // Para el Footer (Azul oscuro elegante)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // O la fuente que uses
      }
    },
  },
  plugins: [],
}