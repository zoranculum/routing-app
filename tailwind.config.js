module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        "dark-salmon": "rgba(255, 128, 102, 1)",
        "bright-salmon": "rgba(255, 128, 102, 0.9)",
        gray: "#2f2a24",
        purple: "#4B4453",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
