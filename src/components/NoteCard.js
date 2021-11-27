import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Snackbar,
  Typography,
  Modal,
  Box,
  Stack,
  Button,
  Backdrop,
  Fade,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import axios from "axios";

//TODO: Will add a custom color highlighter option
const NoteCard = ({ note, handleDelete }) => {
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [favSelected, setFavSelected] = useState(false);

  const [openSuccessSnackbar, setOpenSuccessSnackBar] = useState(false);
  const [openWarningSnackbar, setOpenWarningSnackBar] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSuccessSnackbarClose = () => {
    setOpenSuccessSnackBar(false);
  };
  const handleWarningSnackbarClose = () => {
    setOpenWarningSnackBar(false);
  };

  const noteHighlighter = (category) => {
    if (category === "work") {
      return {
        border: "1px solid #ef5350",
        boxShadow: "0px 6px 41px -15px rgba(30,30,60,0.25)",
      };
    }
    if (category === "todos") {
      return {
        border: "1px solid #ff9800",
        boxShadow: "0px 6px 41px -15px rgba(30,30,60,0.25)",
      };
    }
    if (category === "money") {
      return {
        border: "1px solid #66bb6a",
        boxShadow: "0px 6px 41px -15px rgba(30,30,60,0.25)",
      };
    }
    if (category === "reminders") {
      return {
        border: "1px solid #5c6bc0",
        boxShadow: "0px 6px 41px -15px rgba(30,30,60,0.25)",
      };
    }
  };

  const avatarBackground = (category) => {
    if (category === "work") {
      return {
        backgroundColor: "#ef5350",
      };
    }
    if (category === "todos") {
      return {
        backgroundColor: "#ff9800",
      };
    }
    if (category === "money") {
      return {
        backgroundColor: "#66bb6a",
      };
    }
    if (category === "reminders") {
      return {
        backgroundColor: "#5c6bc0",
      };
    }
  };

  const history = useHistory();

  const handleEdit = (id) => {
    history.push(`/notes/update/${id}`);
  };

  useEffect(() => {
    axios
      .get(`https://mysterious-wave-12411.herokuapp.com/favourites/${note._id}`)
      .then((res) => {
        if (res.data) {
          setFavSelected(true);
        } else {
          setFavSelected(false);
        }
      });
  }, [note._id]);

  const handleFavourite = (id) => {
    setFavSelected(!favSelected);
    if (!favSelected) {
      axios
        .get(`https://mysterious-wave-12411.herokuapp.com/notes/${id}`)
        .then((res) => {
          axios
            .post(
              `https://mysterious-wave-12411.herokuapp.com/favourites`,
              res.data
            )
            .then((res) => {
              if (res.data.insertedId) {
                setOpenSuccessSnackBar(true);
              }
            });
        });
    } else {
      axios
        .delete(`https://mysterious-wave-12411.herokuapp.com/favourites/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            setOpenWarningSnackBar(true);
          }
        });
    }
  };

  const deleteNote = () => {
    handleDelete(note._id);
    setOpenModal(false);
  };

  return (
    <Card sx={() => noteHighlighter(note.category)}>
      <CardHeader
        avatar={
          <Avatar sx={() => avatarBackground(note.category)}>
            {note.category.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          <>
            <IconButton onClick={() => handleEdit(note._id)}>
              <EditOutlined />
            </IconButton>
            <IconButton onClick={() => handleFavourite(note._id)}>
              {favSelected ? (
                <FavoriteOutlinedIcon color="favorite" />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
            {location.pathname !== "/favourites" && (
              <IconButton onClick={handleOpenModal}>
                <DeleteOutlined />
              </IconButton>
            )}
          </>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2">{note.details}</Typography>
      </CardContent>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "none",
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              Want to delete this note?
            </Typography>
            <Box mb={3}>
              {location.pathname === "/" && (
                <Alert severity="warning">
                  This note will delete permanently
                </Alert>
              )}
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Button
                onClick={handleCloseModal}
                variant="contained"
                color="secondary"
              >
                Hell, no!
              </Button>
              <Button onClick={deleteNote} variant="outlined" color="primary">
                Yes, please.
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert
          onClose={handleSuccessSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Note added to favourites!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openWarningSnackbar}
        autoHideDuration={6000}
        onClose={handleWarningSnackbarClose}
      >
        <Alert
          onClose={handleWarningSnackbarClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Note removed from favourites!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default NoteCard;
