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
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import NightlightIcon from "@mui/icons-material/Nightlight";

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

  const [greetHour, setGreetHour] = useState(null);

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

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    setGreetHour(hour);
  }, []);

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
            {greetHour < 12 && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="button" sx={{ fontSize: "1.1rem" }}>
                  Good Morning
                </Typography>
                <WbSunnyIcon sx={{ color: "yellow" }} />
              </Stack>
            )}
          </Typography>
          <Typography sx={{ flexGrow: 1 }}>
            {greetHour >= 12 && greetHour < 17 ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Good Afternoon</Typography>
                <Brightness5Icon sx={{ color: "orange" }} />
              </Stack>
            ) : (
              ""
            )}
          </Typography>
          <Typography sx={{ flexGrow: 1 }}>
            {greetHour > 17 && greetHour <= 24 ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="button">Good Evening</Typography>
                <NightlightIcon sx={{ color: "#544CE6" }} />
              </Stack>
            ) : (
              ""
            )}
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
