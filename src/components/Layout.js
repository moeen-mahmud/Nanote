import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Modal,
  Backdrop,
  Fade,
  Stack,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/system";

const menuItems = [
  {
    text: "My Notes",
    icon: <SubjectOutlinedIcon color="secondary" />,
    path: "/",
  },
  {
    text: "Create Notes",
    icon: <AddCircleOutlineOutlinedIcon color="secondary" />,
    path: "/create",
  },
  {
    text: "Favourites",
    icon: <FavoriteBorderOutlinedIcon color="secondary" />,
    path: "/favourites",
  },
];

const useStyles = makeStyles((theme) => {
  return {
    pages: {
      width: "100%",
      backgroundColor: "#f9f9f9",
      padding: "2rem 0",
    },
    drawer: {
      width: "200px",
      textAlign: "left",
    },
    toolbar: theme.mixins.toolbar,
  };
});

const Layout = ({ children }) => {
  const { user, logOut } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogOut = () => {
    setOpenModal(false);
    logOut();
  };

  return (
    <div style={{ display: "flex" }}>
      <Drawer sx={{ width: "200px" }} variant="permanent" anchor="left">
        <div className={classes.drawer}>
          <Typography variant="h5" sx={{ padding: "1rem" }}>
            NaNote
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  sx={
                    location.pathname === item.path
                      ? {
                          backgroundColor: "#f1f1f1",
                        }
                      : null
                  }
                  onClick={() => history.push(`${item.path}`)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenModal}>
                <ListItemIcon>
                  <LogoutIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <AppBar elevation={0} sx={{ width: `calc(100% - 200px)` }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            Today is {format(new Date(), "eeee',' do MMMM Y'.'")}
          </Typography>
          <Typography
            sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            {user ? (
              <Avatar src={user.photoURL} />
            ) : (
              <Avatar>{user.displayName?.slice(0, 1)}</Avatar>
            )}
            Hello {user ? user.displayName?.split(" ")[0] : ""}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.pages}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "none",
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              Want to logout?
            </Typography>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Button
                onClick={handleCloseModal}
                variant="contained"
                color="secondary"
              >
                Nope
              </Button>
              <Button onClick={handleLogOut} variant="outlined" color="primary">
                Yup
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Layout;
