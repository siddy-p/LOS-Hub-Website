import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            50: '#F0F4F8',
            100: '#D9E2EC',
            200: '#B0C4DE',
            300: '#7B9CBF',
            400: '#4A72A0',
            500: '#2A4D7A',
            600: '#1C385E',
            700: '#162E4D',
            800: '#0F2137', // Logo Primary Deep Navy
            900: '#0A1525',
            950: '#060B14',
          },
          gold: {
            50: '#FDFBF3',
            100: '#FBF5E1',
            200: '#F6E7B8',
            300: '#F0D588',
            400: '#E5C158',
            500: '#D4AF37', // Logo Rich Gold
            600: '#C59B27', // Primary Accent Gold
            700: '#9E7B18',
            800: '#7C5F14',
            900: '#5F4711',
          },
          emerald: {
            50: '#F2F9F5',
            100: '#E1F2E7',
            200: '#C2E4CF',
            300: '#93CFAA',
            400: '#5CB47F',
            500: '#34975A',
            600: '#167046', // Logo Emerald Green
            700: '#115E3B', // Secondary Verified Green
            800: '#0E4B30',
            900: '#0A3924',
          },
          surface: {
            light: '#FAFAFA',
            white: '#FFFFFF',
            card: '#F8FAFC',
            dark: '#0A1118',
            darkCard: '#111A24',
            border: '#E2E8F0',
            darkBorder: '#1E293B',
          },
          charcoal: {
            DEFAULT: '#0F172A',
            muted: '#64748B',
            subtle: '#94A3B8',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        card: '0 4px 20px -2px rgba(15, 33, 55, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        glass: '0 8px 32px 0 rgba(15, 33, 55, 0.08)',
        goldGlow: '0 0 20px rgba(197, 155, 39, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
