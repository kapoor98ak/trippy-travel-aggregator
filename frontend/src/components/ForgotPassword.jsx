import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import axiosInstance from "../api/Axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrMsg("Invalid email address");
      return;
    }
    setErrMsg("");
    setSuccessMsg("");

    try {
      const response = await axiosInstance.post("/auth/forgotPassword", {
        email,
      });
      setSuccessMsg(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Error sending email");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <Box textAlign="center" mb={2} mt={10}>
        <Typography variant="h4" component="h1" fontWeight="bold" mb={5}>
          Password Recovery
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleForgotPassword}>
        <TextField
          id="email"
          name="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          required
          placeholder="john.doe@gmail.com"
          margin="normal"
          error={!!errMsg}
          helperText={errMsg}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Reset Email
          </Button>
        </Box>
        {errMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errMsg}
          </Alert>
        )}

        {successMsg && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMsg}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
