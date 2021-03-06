// Necessary modules
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
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

// Material icons
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import NightsStayIcon from "@mui/icons-material/NightsStay";

// React router v5
import { useLocation, useHistory } from "react-router-dom";

// Use Auth hook
import useAuth from "../hooks/useAuth";

// Menu Items
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

const drawerWidth = 220;

// App drawer
function AppDrawer({ children }) {
  // State for smaller devices
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // authentication states
  const { user, logOut } = useAuth();

  // Top bar greeting state
  const [greetHour, setGreetHour] = React.useState(null);

  // State for modals
  const [openModal, setOpenModal] = React.useState(false);

  // React router
  const history = useHistory();
  const location = useLocation();

  // Click handler for modals
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Click handler for user log out
  const handleLogOut = () => {
    setOpenModal(false);
    logOut();
  };

  // Managing date time
  React.useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    setGreetHour(hour);
  }, []);

  // Drawer toggler
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // The drawer component
  const drawer = (
    <div style={{ position: "relative" }}>
      <Toolbar />
      <Box sx={{ mt: "-2.8rem", mb: "1rem", px: 2 }}>
        <Typography
          fontWeight={500}
          variant="h5"
          component="span"
          color="text.secondary"
        >
          NaNote
        </Typography>
      </Box>
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
        {/* Toolbar */}
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
            {/* Render based on user local time */}
            {greetHour < 12 && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="button" sx={{ fontSize: "1.1rem" }}>
                  Good Morning
                </Typography>
                <WbSunnyIcon sx={{ color: "#FDD835" }} />
              </Stack>
            )}
            {greetHour >= 12 && greetHour < 17 ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Good Afternoon</Typography>
                <Brightness5Icon sx={{ color: "#FB8C00" }} />
              </Stack>
            ) : (
              ""
            )}
            {greetHour > 17 && greetHour <= 24 ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="button">Good Evening</Typography>
                <NightsStayIcon sx={{ color: "#9FA8DA" }} />
              </Stack>
            ) : (
              ""
            )}
          </Typography>
          {/* User name with avatar */}
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
        {/* Using drawer */}
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
      {/* Modal for confirming log out */}
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
