/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,component.ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#080810',
          secondary: '#0d0d1a',
          card: '#111128',
        },
        accent: {
          blue: '#4F8EF7',
          cyan: '#00D4FF',
          purple: '#7C3AED',
          violet: '#A855F7',
        },
        text: {
          primary: '#F0F0FF',
          secondary: '#9090B8',
          muted: '#5A5A7A',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 35s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
