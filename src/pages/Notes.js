import { Alert, Container, Grid, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [openSnackbar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    const confirmation = window.confirm("Do you want to delete this note?");
    if (confirmation) {
      axios.delete(`http://localhost:5000/notes/${id}`).then((res) => {
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

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item xs={12} md={6} lg={4} key={note._id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
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
