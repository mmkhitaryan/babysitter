/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5E9CCA',
        negative: '#C284B4',
      },
      container: {
        center: true,
        padding: '0.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(34% 62.99% at 100.0% 37.01%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
