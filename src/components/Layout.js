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
} from "@mui/material";
import { format } from "date-fns";
import { makeStyles } from "@mui/styles";
import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import { useHistory, useLocation } from "react-router";

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
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <div style={{ display: "flex" }}>
      <Drawer sx={{ width: "200px" }} variant="permanent" anchor="left">
        <div className={classes.drawer}>
          <Typography variant="h5" sx={{ padding: "1rem" }}>
            Notes
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem disablePadding>
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
          </List>
        </div>
      </Drawer>
      <AppBar elevation={0} sx={{ width: `calc(100% - 200px)` }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            Today is {format(new Date(), "eeee',' do MMMM Y'.'")}
          </Typography>
          <Typography>Hello, User</Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.pages}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
