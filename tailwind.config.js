/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#2997FF',
        gray: {
          DEFAULT: '#86868b',
          100: '#94928d',
          200: '#afafaf',
          300: '#42424570',
        },
        zinc: '#101010',
        // Prestige Production Brand Colors
        'pp-charcoal': '#231F20',
        'pp-grey': '#7B7E7E',
        'pp-ice': '#EAEBEC',
        'pp-sage': '#9EB6A9',
        'pp-teal': '#205C57',
        // Tailwind aliases for brand colors
        teal: {
          400: '#14b8a6', // For focus states
          500: '#205C57', // Brand teal
        },
        sage: {
          500: '#9EB6A9', // Brand sage
        },
      },
      fontFamily: {
        // Editorial Luxury Typography System
        serif: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        // Editorial scale with generous sizing
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'editorial-xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'editorial-lg': ['1.25rem', { lineHeight: '1.7', letterSpacing: '0.015em' }],
        'editorial-base': ['1.125rem', { lineHeight: '1.8', letterSpacing: '0.02em' }],
      },
    },
    plugins: [],
    animation: {
      'spin-slow': 'spin 12s linear infinite',
    },
  },
};
