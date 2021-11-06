import {
  Alert,
  Container,
  Snackbar,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";
import { Box } from "@mui/system";
import BackgroundImage from "../assets/main-bg.svg";
import useAuth from "../hooks/useAuth";

export default function Notes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("");

  const [openSnackbar, setOpenSnackBar] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    handleMenuClose();
  };

  useEffect(() => {
    axios
      .get(
        `https://mysterious-wave-12411.herokuapp.com/notes?email=${user.email}&category=${category}`
      )
      .then((res) => {
        setNotes(res.data);
      });
  }, [user.email, category]);

  const handleDelete = (id) => {
    axios
      .delete(`https://mysterious-wave-12411.herokuapp.com/notes/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          axios
            .delete(
              `https://mysterious-wave-12411.herokuapp.com/favourites/${id}`
            )
            .then((res) => {
              if (res.data.deletedCount > 0) {
                const newNotes = notes.filter((note) => note._id !== id);
                setNotes(newNotes);
                setOpenSnackBar(true);
              }
            });
        }
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackBar(false);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <span
        style={{
          position: "relative",
          left: "87%",
          marginTop: "-2rem",
          marginBottom: "1rem",
          display: "inline-block",
        }}
      >
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleMenu}
        >
          Sort By Category
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleCategoryChange("")}>All</MenuItem>
          <MenuItem onClick={() => handleCategoryChange("money")}>
            Money
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange("todos")}>
            Todos
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange("reminders")}>
            Reminders
          </MenuItem>
          <MenuItem onClick={() => handleCategoryChange("work")}>Work</MenuItem>
        </Menu>
      </span>
      {notes.length === 0 ? (
        <Box
          style={{
            backgroundImage: `url("${BackgroundImage}")`,
            height: "60vh",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            textAlign: "center",
          }}
          variant="h3"
        >
          <Box sx={{ my: 5 }}>
            <Typography variant="h3">Welcome to Nanote</Typography>
            <Typography sx={{ mt: 3 }} variant="body1">
              Your note taking companion
            </Typography>
          </Box>
        </Box>
      ) : (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note) => (
            <div key={note._id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </div>
          ))}
        </Masonry>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Note has been deleted
        </Alert>
      </Snackbar>
    </Container>
  );
}
