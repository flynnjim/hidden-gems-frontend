module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accentcolor: "#aaaaaa",
        bgcolor: "#fdf3e8",
        listcolor: "#22543f",
        cardcolor: "#74a38b",
        customyellow: "#f7e18b",
      },
      container: {
        padding: {
          DEFAULT: "20px",
          sm: "20px",
          md: "30px",
          xl: "40px",
        },
        center: true,
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      xl: "1280px",
    },
  },
  plugins: [],
};
