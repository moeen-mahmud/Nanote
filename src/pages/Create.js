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
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

export default function Create() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("todos");

  const history = useHistory();

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    !title ? setTitleError(true) : setTitleError(false);
    !details ? setDetailsError(true) : setDetailsError(false);

    if (title && details) {
      axios
        .post("https://mysterious-wave-12411.herokuapp.com/notes", {
          title: title,
          details: details,
          category: category,
        })
        .then(() => history.push("/"));
    }
  };

  return (
    <Container>
      <Typography variant="h6" component="h2" color="textSecondary" my="1.5rem">
        Create a new note
      </Typography>
      <form
        noValidate
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          variant="outlined"
          label="Note Title"
          fullWidth
          required
          error={titleError}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          onChange={(e) => {
            setDetails(e.target.value);
          }}
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
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
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
          endIcon={<KeyboardArrowRightIcon />}
        >
          Create
        </Button>
      </form>
    </Container>
  );
}
