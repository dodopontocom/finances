/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#29BF12',
          light: '#4FCF3A',
          dark: '#21A00E',
        },
        secondary: {
          DEFAULT: '#08BDBD',
          light: '#0AD4D4',
          dark: '#06A6A6',
        },
        danger: {
          DEFAULT: '#F21B3F',
          light: '#F44A66',
          dark: '#D01535',
        },
        warning: {
          DEFAULT: '#FF9914',
          light: '#FFAD42',
          dark: '#E88200',
        },
        background: '#F8FAFC',
        card: '#FFFFFF',
        text: {
          primary: '#1E293B',
          secondary: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};