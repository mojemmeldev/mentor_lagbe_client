import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'serif'],
      },
      colors: {
        cream: '#FAF8F5',
        warmwhite: '#FFFFFF',
        forest: {
          900: '#0F2922',
          800: '#163A30',
          700: '#1E4E41',
          600: '#276655',
          500: '#33806B',
        },
        brand: {
          50: '#EDFDF3',
          100: '#D1FAE1',
          500: '#14AF51',
          600: '#108F42',
          700: '#0D6E33',
        },
        terracotta: {
          500: '#E05A47',
          600: '#C94836',
          100: '#FCECE9',
          50: '#FDF5F3',
        },
        amberwarm: {
          500: '#F59E0B',
          100: '#FEF3C7',
        },
        wa: {
          header: '#075E54',
          dark: '#054C44',
          bg: '#EFEAE2',
          outgoing: '#DCF8C6',
          blue: '#53BDEB',
          green: '#25D366',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(15, 41, 34, 0.08)',
        card: '0 4px 20px -2px rgba(15, 41, 34, 0.05)',
        glow: '0 12px 30px -6px rgba(224, 90, 71, 0.35)',
        wa: '0 24px 60px -12px rgba(15, 41, 34, 0.22)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '2xl': '1rem',
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      fontSize: {
        'heading-hero': [
          '3.75rem',
          {
            lineHeight: '1.12',
            letterSpacing: '-0.025em',
            fontWeight: '900',
          },
        ],
        'heading-1': [
          '3rem',
          {
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            fontWeight: '900',
          },
        ],
        'heading-2': [
          '2.25rem',
          {
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            fontWeight: '800',
          },
        ],
        'heading-3': [
          '1.875rem',
          {
            lineHeight: '1.25',
            letterSpacing: '-0.015em',
            fontWeight: '800',
          },
        ],
        'heading-4': [
          '1.5rem',
          {
            lineHeight: '1.3',
            letterSpacing: '-0.01em',
            fontWeight: '700',
          },
        ],
        'heading-5': [
          '1.25rem',
          {
            lineHeight: '1.4',
            letterSpacing: '-0.01em',
            fontWeight: '700',
          },
        ],
      },
    },
  },
  plugins: [require('daisyui'), heroui()],
  daisyui: {
    themes: false,
    base: false,
    styled: true,
    utils: true,
    prefix: 'daisy-',
    logs: false,
  },
};

export default config;
