// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-urbanist)', 'sans-serif'],
        nautilus: ['"Nautilus Pompilius"', 'cursive'],
        noctado: ['"NOCTADO"', 'serif'],
      },
    },
  },
  plugins: [],
};  