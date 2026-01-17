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
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card: 'var(--bg-card)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          blue: 'var(--accent-blue)',
          green: 'var(--accent-green)',
          pink: 'var(--accent-pink)',
          yellow: 'var(--accent-yellow)',
        },
        navbar: {
          bg: 'var(--navbar-bg)',
          text: 'var(--navbar-text)',
          border: 'var(--navbar-border)',
        },
        border: 'var(--border-color)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'glow-blue': 'radial-gradient(circle at center, rgba(0, 240, 255, 0.15), transparent 70%)',
        'card-gradient': 'linear-gradient(145deg, #111111 0%, #0a0a0a 100%)',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shine: 'shine 1s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
