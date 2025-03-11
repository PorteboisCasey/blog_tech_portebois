/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'club': {
          black: '#000000',
          dark: '#111111',
          concrete: '#E5E5E5',
          smoke: '#666666',
          neon: '#FF0000',
          strobe: '#FFFFFF',
          text: '#FFFFFF'
        }
      },
      fontFamily: {
        'sans': ['Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['DIN Condensed', 'Impact', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace']
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'scanline': 'scanline 6s linear infinite',
        'noise': 'noise 0.5s steps(5) infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-5px, 3px)' },
          '66%': { transform: 'translate(5px, -3px)' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        noise: {
          '0%, 100%': { clipPath: 'inset(80% 0 0 0)' },
          '20%': { clipPath: 'inset(0 80% 0 0)' },
          '40%': { clipPath: 'inset(0 0 80% 0)' },
          '60%': { clipPath: 'inset(0 0 0 80%)' },
          '80%': { clipPath: 'inset(40% 40% 40% 40%)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
