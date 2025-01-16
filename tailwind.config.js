/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-chelsea': '#001489',
        'blue-dark-blue': '#1C2C5B',
        'blue-navy-blue': '#132257',
        'blue-sky-blue': '#6CABDD',
        'blue-night-blue': '#003399',
        'blue-dark-cyan': '#122F67',
        'blue-crystal': '#1B458F'
      }
    }
  },
  plugins: []
}
