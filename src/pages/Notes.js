import { Alert, Container, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [openSnackbar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    axios
      .get("https://mysterious-wave-12411.herokuapp.com/notes")
      .then((res) => {
        setNotes(res.data);
      });
  }, []);

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
