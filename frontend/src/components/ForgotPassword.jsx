import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateCode = (vcode) => {
    return vcode > 99999 && vcode <= 999999;
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrMsg("Invalid email address");
      return;
    }
    if (verificationCode.trim() === "") {
      setErrMsg2("Verification code is required");
      return;
    }
    if (!validateCode(verificationCode)) {
      setErrMsg2("Invalid Verification Code");
      return;
    }
    setErrMsg("");
    setErrMsg2("");
    setSuccessMsg("Password reset link sent to your email");
    setEmail("");
    setVerificationCode("");
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
          label="Email address"
          type="email"
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
        <TextField
          id="verification-code"
          name="verification-code"
          label="Verification Code"
          type="number"
          variant="outlined"
          fullWidth
          required
          placeholder="Enter your verification code"
          margin="normal"
          error={!!errMsg2 && !validateCode(verificationCode)}
          helperText={errMsg2 && !validateCode(verificationCode) ? errMsg2 : ""}
          onChange={(e) => setVerificationCode(e.target.value)}
          value={verificationCode}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
          </Button>
        </Box>
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
