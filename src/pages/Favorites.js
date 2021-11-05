import { Alert, Container, Grid, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import useAuth from "../hooks/useAuth";

export default function Favourites() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [openSnackbar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    axios
      .get("https://mysterious-wave-12411.herokuapp.com/favourites")
      .then((res) => {
        setNotes(res.data);
      });
  }, []);

  const filterdNotes = notes.filter((note) => note.email === user.email);

  const handleDelete = (id) => {
    axios
      .delete(`https://mysterious-wave-12411.herokuapp.com/notes/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          const newNotes = notes.filter((note) => note._id !== id);
          setNotes(newNotes);
          setOpenSnackBar(true);
        }
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackBar(false);
  };

  return (
    <Container>
      {filterdNotes.length === 0 ? (
        <div style={{ textAlign: "center", padding: "10rem 10rem" }}>
          <h1>You have no favorite notes!</h1>
        </div>
      ) : (
        <Grid container spacing={3}>
          {filterdNotes.map((note) => (
            <Grid item xs={12} md={6} lg={4} key={note._id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
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
