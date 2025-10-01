/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Existing background colors
    'bg-blue-500',
    'bg-orange-500', 
    'bg-green-500',
    'bg-gray-500',
    // Gradient classes for CourseCard component using available colors
    'bg-gradient-to-br',
    'from-brand-orange',
    'to-brand-orange-dark',
    'from-blue-vivid',
    'to-primary-dark',
    'from-purple-vivid',
    'to-danger-dark'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        fadeInUp: 'fadeInUp 0.5s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        // Brand colors (enhanced for premium feel)
        'brand-orange': '#FF7A00',
        'brand-orange-dark': '#E16100',
        'brand-orange-light': '#FF8533',
        'brand-orange-lightest': '#FF8F33',
        'brand-orange-muted': 'var(--color-primary-muted)',
        // Primary colors
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          lightest: 'var(--color-primary-lightest)',
          foreground: 'var(--color-white)',
        },
        // Success colors
        success: {
          DEFAULT: 'var(--color-success)',
          dark: 'var(--color-success-dark)',
          light: 'var(--color-success-light)',
          lightest: 'var(--color-success-lightest)',
          foreground: 'var(--color-white)',
        },
        // Warning colors
        warning: {
          DEFAULT: 'var(--color-warning)',
          dark: 'var(--color-warning-dark)',
          light: 'var(--color-warning-light)',
          lightest: 'var(--color-warning-lightest)',
          foreground: 'var(--color-white)',
        },
        // Danger/Error colors
        danger: {
          DEFAULT: 'var(--color-danger)',
          dark: 'var(--color-danger-dark)',
          light: 'var(--color-danger-light)',
          lightest: 'var(--color-danger-lightest)',
          foreground: 'var(--color-white)',
        },
        error: {
          DEFAULT: 'var(--color-danger)',
          dark: 'var(--color-danger-dark)',
          light: 'var(--color-danger-light)',
          lightest: 'var(--color-danger-lightest)',
          foreground: 'var(--color-white)',
        },
        // Secondary colors
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          dark: 'var(--color-secondary-dark)',
          light: 'var(--color-secondary-light)',
          lightest: 'var(--color-secondary-lightest)',
          foreground: 'var(--color-white)',
        },
        // Neutral colors
        background: 'var(--color-background)',
        foreground: 'var(--color-text-primary)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        muted: {
          DEFAULT: 'var(--color-gray-100)',
          foreground: 'var(--color-text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--color-gray-100)',
          foreground: 'var(--color-text-primary)',
        },
        popover: {
          DEFAULT: 'var(--color-surface)',
          foreground: 'var(--color-text-primary)',
        },
        card: {
          DEFAULT: 'var(--card-bg)',
          foreground: 'var(--color-text-primary)',
        },
        // Component colors
        input: 'var(--color-border)',
        ring: 'var(--color-primary)',
        // Text colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        
        // Vivid stylish colors
        'purple-vivid': 'var(--color-purple-vivid)',
        'blue-vivid': 'var(--color-blue-vivid)',
        'teal-vivid': 'var(--color-teal-vivid)',
        'success-muted': 'var(--color-success-muted)',
        'warning-muted': 'var(--color-warning-muted)',
        'danger-muted': 'var(--color-danger-muted)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
      },
      spacing: {
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
      },
      fontFamily: {
        sans: 'var(--font-family-sans)',
        mono: 'var(--font-family-mono)',
        display: ['"Playfair Display"', 'serif'],
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
      },
      fontWeight: {
        light: 'var(--font-weight-light)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      lineHeight: {
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },
      zIndex: {
        dropdown: 'var(--z-index-dropdown)',
        sticky: 'var(--z-index-sticky)',
        fixed: 'var(--z-index-fixed)',
        'modal-backdrop': 'var(--z-index-modal-backdrop)',
        modal: 'var(--z-index-modal)',
        popover: 'var(--z-index-popover)',
        tooltip: 'var(--z-index-tooltip)',
      },
    },
  },
  plugins: [
    require('./tailwind-token-plugin'),
  ],
}