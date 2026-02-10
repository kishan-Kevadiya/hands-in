// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3f1562',
        secondary: '#fc5f5f',
        field: '#f7eeff',
        lavender: '#F1DFFF',
        lilac: '#BF9CF9',
        peach: 'peach',
        lavenderWhite:'rgba(252, 249, 255, 0.8)',
        pink: '#f6edf5',
        royalPurple: '#3D1562',
        deepViolet: '#3F1462'
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(180deg, #3F1562 0%, #DF6789 60%, rgba(255,255,255,0.4) 100%)',
      },
      fontFamily: {
        manrope: ['var(--font-manrope)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
};