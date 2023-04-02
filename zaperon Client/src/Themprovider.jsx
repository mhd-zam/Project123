import { createTheme, ThemeProvider } from "@mui/material";

function Themprovider({ children }) {
  const Theme = createTheme({
      palette: {
          primary: {
            main:'#0B3558'
          },
          secondary: {
              main:'#003FB9'
          }
    },
    typography: {
        fontFamily: ["Open Sans", "sans-serif"].join(","),
        variantMapping: {
            body1:'caption'
        },
      h4: {
          fontSize: "42px",
          fontWeight:700
        },
        body1: {
            fontSize: '14px'
        },
        caption: {
            fontSize: '12px',
            fontWeight:700
        },
        body2: {
            fontSize: '12px',
            color:'#728391'
        },
        subtitle1: {
            fontSize: '12px',
            fontWeight:700
        }
    },
  });
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
}

export default Themprovider;
