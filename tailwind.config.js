/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F0E4CC',
          light: '#FAF4E6',
          dark: '#D8C7A1',
          deep: '#C2AF82',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          soft: '#161616',
          raised: '#1F1F1F',
        },
        gothic: {
          burgundy: '#4A0E1A',
          wine:     '#6B1728',
          parchment:'#EDE0C8',
          ash:      '#2A2A2A',
          bone:     '#D6C9B0',
        },
        // ── Core palette ──────────────────────────────
        // dark mode:  bg = charcoal (#1C1E20), on = glacier white (#F5F7FA)
        // light mode: bg = glacier white (#F5F7FA), on = charcoal (#1C1E20)
        surface: {
          light: '#F5F7FA',   // glacier white
          dark:  '#0D0D0D',   // true near-black / matt black
        },
        on: {
          light: '#1C1E20',   // charcoal text on light bg
          dark:  '#F5F7FA',   // glacier white text on dark bg
        },
        // convenience aliases for one-off use in components
        charcoal: '#1C1E20',
        glacier:  '#F5F7FA',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"Inter"', 'sans-serif'],
        gothic:  ['"Cinzel Decorative"', 'serif'],
        fell:    ['"IM Fell English"', 'serif'],
      },
      boxShadow: {
        '3d-black':    '0 1px 0 #000, 0 2px 0 #000, 0 3px 0 #000, 0 4px 6px rgba(0,0,0,0.6)',
        '3d-gold':     '0 1px 0 #a8916a, 0 2px 0 #8f7956, 0 4px 10px rgba(240,228,204,0.35)',
        'gothic-frame':'inset 0 0 0 1px currentColor, inset 0 0 0 3px transparent, inset 0 0 0 4px currentColor',
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '92%':      { opacity: 1 },
          '93%':      { opacity: 0.85 },
          '94%':      { opacity: 1 },
          '96%':      { opacity: 0.9 },
          '97%':      { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}