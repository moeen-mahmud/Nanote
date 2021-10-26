import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import axios from "axios";

//TODO: Will add a custom color highlighter option
const NoteCard = ({ note, handleDelete }) => {
  const [favSelected, setFavSelected] = useState(false);
  const [favourite, setFavourite] = useState({});

  const noteHighlighter = (category) => {
    if (category === "work") {
      return { border: "1px solid red" };
    }
  };
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/notes/${note._id}`).then((res) => {
      setFavourite(res.data);
    });
  }, [note._id]);

  const handleEdit = (id) => {
    history.push(`/notes/update/${id}`);
  };

  const handleFavourite = () => {
    setFavSelected(!favSelected);
    console.log(!favSelected);
    if (!favSelected) {
      axios
        .put(`http://localhost:5000/favourites`, favourite)
        .then((res) => console.log(res));
    } else {
      axios
        .delete(`http://localhost:5000/favourites/${note._id}`)
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <Card sx={() => noteHighlighter(note.category)} elevation={1}>
      <CardHeader
        action={
          <>
            <IconButton onClick={() => handleEdit(note._id)}>
              <EditOutlined />
            </IconButton>
            <IconButton onClick={handleFavourite}>
              {favSelected ? (
                <FavoriteOutlinedIcon color="secondary" />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
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
