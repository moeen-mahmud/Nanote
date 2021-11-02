import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "../hooks/useAuth";
import { useHistory, useLocation } from "react-router";
const Login = () => {
  const { signInUsingGoogle } = useAuth();

  const location = useLocation();
  const history = useHistory();
  const redirectUrl = location.state?.from || "/";

  const handleGoogleSignIn = () => {
    signInUsingGoogle().then((result) => {
      console.log(result.user);
      history.push(redirectUrl);
    });
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        zIndex: 5000,
        position: "absolute",
        top: 0,
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ mt: 20 }}>
        <Typography variant="h3">Nanote</Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 5 }}>
          Your Notetaking companion
        </Typography>
        <Button
          onClick={handleGoogleSignIn}
          variant="contained"
          sx={{ py: 2 }}
          startIcon={<GoogleIcon />}
        >
          Continue with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
