import { createTheme } from "@mui/material";

const themeUI = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: "1.5rem",
      },
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: "1.3rem",
      },
    },
    body1: {
      fontSize: "1rem",
      '@media (max-width:600px)': {
        fontSize: "0.9rem",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          '@media (max-width:600px)': {
            padding: '6px 12px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
          '@media (max-width:600px)': {
            marginBottom: '12px',
          },
        },
      },
    },
  },
});

export default themeUI;