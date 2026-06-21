/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,component.ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend Deca', 'system-ui', 'sans-serif'],
        heading: ['Zalando Sans Expanded', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#0a0a0a',
          secondary: '#111111',
          card: '#171717',
        },
        accent: {
          blue: '#6366f1',
          cyan: '#818cf8',
          purple: '#4f46e5',
          violet: '#6366f1',
        },
        text: {
          primary: '#ededed',
          secondary: '#a1a1aa',
          muted: '#71717a',
        },
        border: '#262626',
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
