import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

//TODO: Will add a custom color highlighter option
const NoteCard = ({ note, handleDelete }) => {
  const noteHighlighter = (category) => {
    if (category === "work") {
      return { border: "1px solid red" };
    }
  };
  const history = useHistory();

  const handleEdit = (id) => {
    history.push(`/notes/update/${id}`);
  };

  return (
    <Card sx={() => noteHighlighter(note.category)} elevation={1}>
      <CardHeader
        action={
          <>
            <IconButton onClick={() => handleEdit(note._id)}>
              <EditOutlined />
            </IconButton>
            <IconButton onClick={() => handleDelete(note._id)}>
              <DeleteOutlined />
            </IconButton>
          </>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2">{note.details}</Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
