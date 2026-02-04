// Theme configuration based on H&LP Business branding
export const theme = {
  colors: {
    primary: {
      gold: '#C9A961',
      goldLight: '#D4B876',
      goldDark: '#B8964D',
    },
    neutral: {
      black: '#000000',
      gray900: '#1A1A1A',
      gray800: '#2D2D2D',
      gray700: '#4A4A4A',
      gray600: '#6B6B6B',
      gray500: '#8C8C8C',
      gray400: '#ADADAD',
      gray300: '#CECECE',
      gray200: '#E5E5E5',
      gray100: '#F5F5F5',
      white: '#FFFFFF',
      cream: '#FFF5F5',
    },
    status: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6',
    },
  },
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, sans-serif',
      serif: 'Georgia, serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '2.5rem',// 40px
    '3xl': '3rem',  // 48px
  },
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
};

export type Theme = typeof theme;