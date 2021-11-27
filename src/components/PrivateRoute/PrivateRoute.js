// Import necessary modules
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../../hooks/useAuth";

// Main Private Route
const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    // Return if the window is reloading
    return (
      <Box sx={{ position: "absolute", left: "50%", top: "50%" }}>
        <CircularProgress />
      </Box>
    );
  }
  // Render for general time
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
