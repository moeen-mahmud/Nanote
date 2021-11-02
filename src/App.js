import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout";
import Update from "./pages/Update";
import Favorites from "./pages/Favorites";
import AuthProvider from "./context/AuthProvider";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
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
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <PrivateRoute exact path="/">
                <Notes />
              </PrivateRoute>
              <PrivateRoute path="/create">
                <Create />
              </PrivateRoute>
              <PrivateRoute path="/favourites">
                <Favorites></Favorites>
              </PrivateRoute>
              <PrivateRoute path="/notes/update/:id">
                <Update></Update>
              </PrivateRoute>
            </Switch>
          </Layout>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
