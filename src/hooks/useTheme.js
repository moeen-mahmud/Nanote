import { createTheme } from "@mui/material";

const useTheme = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#232832",
      },
      secondary: {
        main: "#544CE6",
      },
      favorite: {
        main: "#E23E58",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  });

  return { theme };
};

export default useTheme;
