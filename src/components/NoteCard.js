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

  const handleEdit = (id) => {
    history.push(`/notes/update/${id}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/favourites/${note._id}`).then((res) => {
      // console.log(res.data);
      if (res.data) {
        setFavSelected(true);
      } else {
        setFavSelected(false);
      }
    });
  }, [note._id]);

  const handleFavourite = (id) => {
    axios.get(`http://localhost:5000/notes/${id}`).then((res) => {
      // console.log(res.data);
      axios.post(`http://localhost:5000/favourites`, res.data).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          axios.get(`http://localhost:5000/favourites/${id}`).then((res) => {
            // console.log(res.data);
            setFavourite(res.data);
            setFavSelected(true);
          });
        }
      });
    });
  };

  // console.log(favourite);
  // const processingFav = async () => {
  //   await axios
  //     .post(`http://localhost:5000/favourites`, favourite)
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  // const deleteFromFav = async (id) => {
  //   await axios.delete(`http://localhost:5000/favourites/${id}`).then((res) => {
  //     console.log(res.data);
  //   });
  // };

  // const handleFavourite = (id) => {
  //   axios.get(`http://localhost:5000:/notes/${id}`).then((res) => {
  //     console.log(res.data);
  //   });
  // };

  return (
    <Card sx={() => noteHighlighter(note.category)} elevation={1}>
      <CardHeader
        action={
          <>
            <IconButton onClick={() => handleEdit(note._id)}>
              <EditOutlined />
            </IconButton>
            <IconButton onClick={() => handleFavourite(note._id)}>
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
