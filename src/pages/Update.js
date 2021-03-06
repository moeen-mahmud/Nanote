import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Chip,
  Stack,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import EditIcon from "@mui/icons-material/Edit";

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";

import { format } from "date-fns";

export default function Update() {
  const { id } = useParams();
  const [note, setNote] = useState({});

  const url = `https://mysterious-wave-12411.herokuapp.com/notes/${id}`;

  const history = useHistory();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  useEffect(() => {
    axios.get(url).then((res) => {
      setNote(res.data);
    });
  }, [url]);

  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value;
    const updatedNote = { ...note };
    updatedNote.title = updatedTitle;
    setNote(updatedNote);
  };
  const handleDetailsChange = (e) => {
    const updatedDetails = e.target.value;
    const updatedNote = { ...note };
    updatedNote.details = updatedDetails;
    setNote(updatedNote);
  };
  const handleCategoryChange = (e) => {
    const updatedCategory = e.target.value;
    const updatedNote = { ...note };
    updatedNote.category = updatedCategory;
    setNote(updatedNote);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    !note.title ? setTitleError(true) : setTitleError(false);
    !note.details ? setDetailsError(true) : setDetailsError(false);

    if (note.title && note.details) {
      axios
        .put(url, {
          title: note.title,
          details: note.details,
          category: note.category,
          modifiedAt: `${format(
            new Date(),
            "eeee',' do MMMM Y 'at' KK':'mm a'.'"
          )}`,
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            setOpenSnackbar(true);
          }
        });
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        color="textSecondary"
        mt="-1rem"
        mb="1rem"
      >
        Update the note
      </Typography>
      {note.modifiedAt ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography color="text.secondary" variant="button">
            Modified at:{" "}
          </Typography>
          <Chip label={note.modifiedAt} icon={<AccessTimeIcon />} />
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography color="text.secondary" variant="button">
            Created at:{" "}
          </Typography>
          <Chip label={note.createdAt} icon={<AccessTimeIcon />} />
        </Stack>
      )}
      <form
        noValidate
        component="form"
        autoComplete="off"
        onSubmit={handleUpdate}
        style={{ marginTop: "2rem" }}
      >
        <TextField
          value={note.title || ""}
          onChange={handleTitleChange}
          variant="outlined"
          label="Note Title"
          fullWidth
          required
          error={titleError}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          value={note.details || ""}
          onChange={handleDetailsChange}
          variant="outlined"
          label="Note Details"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
          sx={{ marginBottom: "1rem" }}
        />
        <FormControl fullWidth sx={{ margin: "1rem 0" }}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={note.category || ""}
            onChange={handleCategoryChange}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<EditIcon />}
        >
          Update
        </Button>
        <Button
          sx={{ marginLeft: "1rem" }}
          variant="contained"
          color="primary"
          endIcon={<KeyboardArrowLeftIcon />}
          onClick={() => {
            history.push("/");
          }}
        >
          Back
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Note has been updated
        </Alert>
      </Snackbar>
    </Container>
  );
}
