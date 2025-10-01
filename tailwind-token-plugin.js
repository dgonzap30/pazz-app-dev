/**
 * Tailwind CSS Design Token Plugin for Pazz Affiliate Portal
 * Enforces consistent use of design tokens throughout the application
 */

const plugin = require('tailwindcss/plugin');

// Design tokens from DESIGN-PRINCIPLES.md
const designTokens = {
  colors: {
    // Primary brand colors
    primary: {
      DEFAULT: '#FF7A00',
      dark: '#E16100',
      light: '#FF8533',
      lightest: '#FF8C42',
      muted: '#FFE4CC',
    },
    // Semantic colors
    success: {
      DEFAULT: '#10B981',
      dark: '#059669',
      light: '#34D399',
      lightest: '#00E676',
      muted: '#D1FAE5',
    },
    warning: {
      DEFAULT: '#F59E0B',
      dark: '#D97706',
      light: '#FBBF24',
      lightest: '#FFB020',
      muted: '#FEF3C7',
    },
    danger: {
      DEFAULT: '#EF4444',
      dark: '#DC2626',
      light: '#F87171',
      lightest: '#FF5252',
      muted: '#FEE2E2',
    },
    // Neutral colors
    gray: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
      950: '#030712',
    },
    // Additional vivid colors
    purple: '#9C27B0',
    blue: '#2196F3',
    teal: '#00BCD4',
  },
  spacing: {
    // 8pt grid system
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
  },
  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
      display: ['Playfair Display', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
  },
};

module.exports = plugin(function({ addBase, addUtilities, theme }) {
  // Add CSS custom properties for design tokens
  addBase({
    ':root': {
      // Primary colors
      '--color-primary': designTokens.colors.primary.DEFAULT,
      '--color-primary-dark': designTokens.colors.primary.dark,
      '--color-primary-light': designTokens.colors.primary.light,
      '--color-primary-lightest': designTokens.colors.primary.lightest,
      '--color-primary-muted': designTokens.colors.primary.muted,
      
      // Success colors
      '--color-success': designTokens.colors.success.DEFAULT,
      '--color-success-dark': designTokens.colors.success.dark,
      '--color-success-light': designTokens.colors.success.light,
      '--color-success-lightest': designTokens.colors.success.lightest,
      '--color-success-muted': designTokens.colors.success.muted,
      
      // Warning colors
      '--color-warning': designTokens.colors.warning.DEFAULT,
      '--color-warning-dark': designTokens.colors.warning.dark,
      '--color-warning-light': designTokens.colors.warning.light,
      '--color-warning-lightest': designTokens.colors.warning.lightest,
      '--color-warning-muted': designTokens.colors.warning.muted,
      
      // Danger colors
      '--color-danger': designTokens.colors.danger.DEFAULT,
      '--color-danger-dark': designTokens.colors.danger.dark,
      '--color-danger-light': designTokens.colors.danger.light,
      '--color-danger-lightest': designTokens.colors.danger.lightest,
      '--color-danger-muted': designTokens.colors.danger.muted,
      
      // Additional vivid colors
      '--color-purple-vivid': designTokens.colors.purple,
      '--color-blue-vivid': designTokens.colors.blue,
      '--color-teal-vivid': designTokens.colors.teal,
    },
  });

  // Add utility classes for common patterns
  addUtilities({
    // Focus ring utilities following design system
    '.focus-ring-primary': {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${designTokens.colors.primary.DEFAULT}40`,
        borderColor: designTokens.colors.primary.DEFAULT,
      },
    },
    '.focus-ring-success': {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${designTokens.colors.success.DEFAULT}40`,
        borderColor: designTokens.colors.success.DEFAULT,
      },
    },
    '.focus-ring-danger': {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${designTokens.colors.danger.DEFAULT}40`,
        borderColor: designTokens.colors.danger.DEFAULT,
      },
    },
    
    // Card hover effects
    '.card-hover': {
      transition: 'all 150ms ease-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: designTokens.shadows.lg,
      },
    },
    
    // Skeleton animation
    '.skeleton-shimmer': {
      background: `linear-gradient(90deg, ${designTokens.colors.gray[200]} 0%, ${designTokens.colors.gray[100]} 50%, ${designTokens.colors.gray[200]} 100%)`,
      backgroundSize: '200% 100%',
      animation: 'shimmer 2s linear infinite',
    },
    
    // Status badges
    '.badge-success': {
      backgroundColor: designTokens.colors.success.muted,
      color: designTokens.colors.success.dark,
      borderColor: designTokens.colors.success.light,
    },
    '.badge-warning': {
      backgroundColor: designTokens.colors.warning.muted,
      color: designTokens.colors.warning.dark,
      borderColor: designTokens.colors.warning.light,
    },
    '.badge-danger': {
      backgroundColor: designTokens.colors.danger.muted,
      color: designTokens.colors.danger.dark,
      borderColor: designTokens.colors.danger.light,
    },
    
    // Button variants
    '.btn-primary': {
      backgroundColor: designTokens.colors.primary.DEFAULT,
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: designTokens.colors.primary.dark,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${designTokens.colors.primary.DEFAULT}40`,
      },
    },
    '.btn-success': {
      backgroundColor: designTokens.colors.success.DEFAULT,
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: designTokens.colors.success.dark,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${designTokens.colors.success.DEFAULT}40`,
      },
    },
    '.btn-danger': {
      backgroundColor: designTokens.colors.danger.DEFAULT,
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: designTokens.colors.danger.dark,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${designTokens.colors.danger.DEFAULT}40`,
      },
    },
  });
}, {
  theme: {
    extend: {
      colors: designTokens.colors,
      spacing: designTokens.spacing,
      borderRadius: designTokens.borderRadius,
      boxShadow: designTokens.shadows,
      fontFamily: designTokens.typography.fontFamily,
      fontSize: designTokens.typography.fontSize,
    },
  },
});