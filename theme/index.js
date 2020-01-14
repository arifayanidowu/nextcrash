const themeConfig = {
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    fontFamily: [
      "Quicksand",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    type: "light",
    primary: {
      light: "#4791db",
      main: "#1976d2",
      dark: "#115293",
      contrastText: "#fefefe"

      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#e33371",

      main: "#dc004e",
      dark: "#9a0036"
    },
    success: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c"
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
};

export default themeConfig;
