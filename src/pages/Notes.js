import { Alert, Container, Snackbar, Typography } from "@mui/material";
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
  const [openSnackbar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    axios
      .get("https://mysterious-wave-12411.herokuapp.com/notes")
      .then((res) => {
        setNotes(res.data);
      });
  }, []);

  const filteredNotes = notes.filter((note) => note.email === user.email);

  const handleDelete = (id) => {
    const confirmation = window.confirm("Do you want to delete this note?");
    if (confirmation) {
      axios
        .delete(`https://mysterious-wave-12411.herokuapp.com/notes/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
            setOpenSnackBar(true);
          }
        });
    }
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
      {filteredNotes.length === 0 ? (
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
          {filteredNotes.map((note) => (
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
