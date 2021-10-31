import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout";
import Update from "./pages/Update";
import Favorites from "./pages/Favorites";
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/favourites">
              <Favorites></Favorites>
            </Route>
            <Route path="/notes/update/:id">
              <Update></Update>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
