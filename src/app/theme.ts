import { colors, createMuiTheme } from "@material-ui/core";

const createTheme = (darkTheme: boolean) =>
  createMuiTheme({
    palette: {
      type: darkTheme ? "dark" : "light",
      primary: colors.blue,
      secondary: colors.pink
    },
    typography: {
      fontFamily: [
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
    }
  });

export default createTheme;
