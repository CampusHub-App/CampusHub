/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '1024': '1024px',
      },
      colors: {
        customBlue: '#027fff',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out',
      },
      animationDelay: {
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
      },
    },
    screens: {
      'selamat': '900',
      'sm': '414px',
      'tengah': '550px',
      'md': '768px',
      'lg': '1050px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}