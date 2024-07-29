import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Rating,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const AddReviewModal = ({ tripId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("auth"));

    if (!user) {
      toast.error("You need to be logged in to add a review.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/reviews/create",
        {
          tripId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Review added successfully!");
      onClose();
    } catch (error) {
      toast.error("Error adding review.");
      console.error("Error adding review:", error);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box p={4} bgcolor="white" borderRadius={2}>
        <Typography variant="h6">Add a Review</Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          max={5}
        />
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddReviewModal;
