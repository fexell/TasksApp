export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        primary: 'var(--primary-color)',
      },
      spacing: {
        '14.25': '3.5625rem',
      },
    },
  },
  plugins: [],
}
