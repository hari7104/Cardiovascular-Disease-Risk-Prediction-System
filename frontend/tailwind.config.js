/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001F3F',
        accent: '#FBBF24',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#DC2626',
      },
      boxShadow: {
        glass: '0 10px 30px rgba(0,0,0,0.12)',
      },
      keyframes: {
        'cell-ripple': {
          '0%': { opacity: '1', transform: 'scale(0.9)' },
          '100%': { opacity: '0', transform: 'scale(1.2)' },
        },
      },
      animation: {
        'cell-ripple': 'cell-ripple var(--duration, 800ms) ease-out var(--delay, 0ms)',
      },
    },
  },
  plugins: [],
}


