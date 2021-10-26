import { Button } from "@mui/material";
import { styled } from "@mui/system";

const useButtons = () => {
  const PrimaryButton = styled(Button)({
    backgroundColor: "#232832",
    color: "#fefeff",
    "&:hover": {
      backgroundColor: "#fefeff",
      color: "#232832",
    },
  });
  const SecondaryButton = styled(Button)({
    color: "#232832",
    borderColor: "#232832",
    "&:hover": {
      borderColor: "#232832",
    },
  });

  return { PrimaryButton, SecondaryButton };
};

export default useButtons;
