/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0d121d',
        'bg-card': 'rgba(18, 26, 41, 0.75)',
        'gold-premium': '#ece2b6',
        'gold-bright': '#ffd700',
        'anemo-teal': '#4ef2d2',
        'text-main': '#f4f5f6',
        'text-muted': '#a5b1c2',
        'fantasy-border': 'rgba(236, 226, 182, 0.15)',
      },
      fontFamily: {
        'fantasy': ['Cinzel', 'serif'],
        'sans': ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite alternate',
        'blink-text': 'blinkText 2.5s infinite',
        'slow-pan': 'slowPan 40s ease-in-out infinite alternate',
        'gate-zoom': 'gateZoom 30s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%': { textShadow: '0 0 5px rgba(236, 226, 182, 0.2)', opacity: '0.6' },
          '100%': { textShadow: '0 0 20px rgba(236, 226, 182, 0.8)', opacity: '1' },
        },
        blinkText: {
          '0%, 100%': { opacity: '0.4', textShadow: '0 0 2px transparent' },
          '50%': { opacity: '1', textShadow: '0 0 10px rgba(236, 226, 182, 0.6)' },
        },
        slowPan: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.06) translate(-10px, -10px)' },
        },
        gateZoom: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.12)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #f5ecd2, #cebc87)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(236, 226, 182, 0.4), transparent)',
      },
    },
  },
  plugins: [],
}