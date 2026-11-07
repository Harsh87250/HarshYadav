/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050914',
          secondary: '#0A1426',
          elevated: '#0F1B33',
        },
        neon: {
          blue: '#4CA8FF',
          cyan: '#6CE6FF',
          purple: '#8B7BFF',
        },
        text: {
          primary: '#EAF2FF',
          secondary: '#91A3BD',
          muted: '#5A6B85',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(76, 168, 255, 0.35), 0 0 40px rgba(76, 168, 255, 0.15)',
        'neon-cyan': '0 0 20px rgba(108, 230, 255, 0.35), 0 0 40px rgba(108, 230, 255, 0.15)',
        'neon-purple': '0 0 20px rgba(139, 123, 255, 0.35), 0 0 40px rgba(139, 123, 255, 0.15)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #4CA8FF 0%, #6CE6FF 50%, #8B7BFF 100%)',
        'neon-radial': 'radial-gradient(circle at 50% 50%, rgba(76,168,255,0.15) 0%, transparent 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(76,168,255,0.3), 0 0 20px rgba(76,168,255,0.1)' },
          'to': { boxShadow: '0 0 20px rgba(76,168,255,0.6), 0 0 40px rgba(76,168,255,0.3)' },
        },
      },
    },
  },
  plugins: [],
};
