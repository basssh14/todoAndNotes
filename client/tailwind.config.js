module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    letterSpacing: {
      widest: ".5rem",
      normal: ".3rem",
    },
    extend: {
      translate: {
        "1/23": "-47%",
      },
      height: {
        new: "fit-content",
        "24/2": "12%",
        "132/2": "62%",
        "44/2": "28%",
        "20/2": "10%",
        "170/2": "85%",
        "180/2": "90%",
      },
      width: {
        "20/2": "10%",
        special: "22.5%",
        "60/2": "30%",
        "70/2": "37%",
        "140/2": "70%",
        "180/2": "90%",
        almost: "95%",
        "90/2": "45%",
      },
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        box: "1rem",
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
      },
      inset: {
        "170/2": "85%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
      },
      gridRow: {
        "span-7": "span 7 / span 7",
      },
      margin: {
        "-4.5": "-1.12rem",
      },
      maxHeight: {
        "20/2": "10vh",
        "124/2": "62vh",
        "56/2": "28vh",
      },
      minHeight: {
        32: "8rem",
      },
    },
    fontSize: {
      rsmall: ".6rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      medium: "1.68rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      tiny: "2.50rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      normal: "100%",
      big: "75%",
      large: "65%",
      small: "56.25%",
      vsmall: "50%",
    },
    screens: {
      xl2: "1841px",
      xl: { max: "1840px" },
      lg3: { max: "1600px" },
      lg2: { max: "1400px" },
      lg1: { max: "1300px" },
      lg: { max: "1200px" },
      md3: { max: "1100px" },
      md2: { max: "1000px" },
      md: { max: "900px" },
      sm2: { max: "800px" },
      sm: { max: "600px" },
      rsm: { max: "420px" },
    },
  },
  variants: {
    extend: {
      visibility: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
