import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm earthy palette
        'terra': {
          50: '#f9f5f2',
          100: '#f3eae4',
          200: '#e6d5c9',
          300: '#ddbea9',
          400: '#cb997e',
          500: '#a06f51',
          600: '#8c613e',
          700: '#6f4d31',
          800: '#553c28',
          900: '#3d2c1e',
        },
        'sage': {
          50: '#f5f5f0',
          100: '#e9eae2',
          200: '#d4d6c7',
          300: '#b8bba5',
          400: '#a5a58d',
          500: '#83866f',
          600: '#6b705c',
          700: '#555944',
          800: '#3f4131',
          900: '#2b2c21',
        },
      },
      boxShadow: {
        'soft': '0 4px 12px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'medium': '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06)',
        'strong': '0 12px 24px -6px rgba(0, 0, 0, 0.12), 0 6px 12px -3px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-subtle': 'pulseSubtle 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config