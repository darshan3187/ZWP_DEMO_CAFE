/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        espresso: '#1A120B',
        mocha: '#7D5233', // Darkened for better contrast
        cborder: '#EAE5DB', // Slightly more visible
        muted: '#5C5450', // Darkened for accessibility
        warm: '#F2EEE5',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'scroll-down': 'scrollDown 2s infinite',
      },
      keyframes: {
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: 0.5 },
          '50%': { transform: 'translateY(10px)', opacity: 1 },
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
