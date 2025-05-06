/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          50: '#f0f4ff',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a'
        },
        'primary': '#2563eb',
        'primary-hover': '#1d4ed8' 
      },
      borderRadius: {
        'xl': '1rem'          
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}


