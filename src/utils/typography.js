import Typography from "typography";

const typography = new Typography({
  title: "japanese-riywo",
  baseFontSize: "19px",
  baseLineHeight: "2.0em",
  scaleRatio: 2.3,
  googleFonts: [
    {
      name: "Noto+Sans+JP",
      styles: ["400"],
    },
    {
      name: "Noto+Serif+JP",
      styles: ["400"],
    },
  ],
  headerFontFamily: ["Noto Sans JP", "sans-serif"],
  bodyFontFamily: ["Noto Serif JP", "serif"],
  headerColor: "inherit",
  bodyColor: "inherit",

  overrideStyles: ({ scale, rhythm }, options, styles) => ({
    html: {
      WebkitFontSmoothing: "antialiased",
    },
    "h1,h2,h3,h4,h5,h6": {
      letterSpacing: "0.02em",
      marginTop: "2.5em",
      marginBottom: "0.8em",
    },
    p: {
      letterSpacing: "0.01em",
      textIndent: "1em",
      textAlign: "justify",
      wordBreak: "break-all",
    },
    a: {
      color: "inherit",
    },
    "a:hover": {
      color: "inherit",
    },
    li: {
      marginBottom: "0px",
    },
    blockquote: {
      //color: gray(47),
      fontSize: "85%",
      position: "relative",
      marginLeft: "0.5em",
      marginRight: "0.5em",
      marginBottom: "1.8em",
      padding: "0.5em 1em 0.5em 2em",
    },
    "blockquote:before": {
      position: "absolute",
      fontSize: "1.5em",
      lineHeight: "1",
      top: "0.2em",
      left: "0.5em",
      content: '"\\201C"',
      //color: gray(30),
    },
    pre: {
      overflowX: "auto",
      padding: "1rem",
      background: "hsla(0,0%,0%,0.04)",
    },
  }),
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
