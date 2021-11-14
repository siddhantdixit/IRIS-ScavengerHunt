module.exports = {
  purge: [
    './server/views/**/*.html',
    './server/views/**/*.pug',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
