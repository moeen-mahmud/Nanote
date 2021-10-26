import { Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/notes/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
        console.log(newNotes);
      }
    });
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
    </Container>
  );
}
