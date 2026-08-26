/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        border: 'var(--line)',
        bg: 'var(--bg)',
        bglight: 'var(--bg-light)',
        surface: 'var(--surface)',
        accent: 'var(--accent)',
        accent2: 'var(--accent-2)',
        ink: 'var(--ink)',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: { lg: '0.5rem', md: '0.375rem', sm: '0.25rem' },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
