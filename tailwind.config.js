/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  safelist: [
    {
      pattern: /^bg-/,
    },
    {
      pattern: /^bg-gradient-to-/,
    },
    {
      pattern: /^from-/,
    },
    {
      pattern: /^via-/,
    },
    {
      pattern: /^to-/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
