/** @type {import('tailwindcss').Config} */
export default {
  // 'class' dark mode means dark mode turns on when a <html class="dark"> is present
  // (rather than following the OS setting automatically). We control this ourselves
  // later via a theme toggle + localStorage.
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette from the WTF spec.
        // Each has a full 50-900 scale so we have light/dark variants to work with.
        brand: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            300: '#86efac',
            500: '#22c55e', // primary green
            600: '#16a34a',
            700: '#15803d',
            900: '#14532d',
          },
          blue: {
            50: '#eff6ff',
            300: '#93c5fd',
            500: '#3b82f6', // accent blue
            600: '#2563eb',
            700: '#1d4ed8',
          },
          orange: {
            300: '#fdba74',
            500: '#f97316', // warning
            600: '#ea580c',
          },
          red: {
            300: '#fca5a5',
            500: '#ef4444', // danger
            600: '#dc2626',
          },
        },
        // Backgrounds
        surface: {
          light: '#f9fafb', // light gray background (light mode)
          dark: '#1a1a1a',  // charcoal black (dark mode)
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        softDark: '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
