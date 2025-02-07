/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6F61',
        secondary: '#6B5B95',
        background: '#F7F7F7',
        text: '#333333',
        accent: '#4ECDC4',
        error: '#FF6B6B',
        success: '#2ECC71'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}