import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout";
import Update from "./pages/Update";
import Favorites from "./pages/Favorites";
import AuthProvider from "./context/AuthProvider";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import useTheme from "./hooks/useTheme";

function App() {
  const { theme } = useTheme();

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
