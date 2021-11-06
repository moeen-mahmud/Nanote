import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Modal, Backdrop, Fade, Stack } from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import NightlightIcon from "@mui/icons-material/Nightlight";

import { useLocation, useHistory } from "react-router-dom";

import useAuth from "../hooks/useAuth";

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

const drawerWidth = 200;

function AppDrawer({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { user, logOut } = useAuth();

  const [greetHour, setGreetHour] = React.useState(null);

  const [openModal, setOpenModal] = React.useState(false);

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

  React.useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    setGreetHour(hour);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ position: "relative" }}>
      <Toolbar />
      <Divider />
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
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {greetHour < 12 && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="button" sx={{ fontSize: "1.1rem" }}>
                  Good Morning
                </Typography>
                <WbSunnyIcon sx={{ color: "yellow" }} />
              </Stack>
            )}
            {greetHour >= 12 && greetHour < 17 ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Good Afternoon</Typography>
                <Brightness5Icon sx={{ color: "orange" }} />
              </Stack>
            ) : (
              ""
            )}
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
            component="span"
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
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
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
    </Box>
  );
}

export default AppDrawer;
