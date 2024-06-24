import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fNameError, setFNameError] = useState("");
  const [lNameError, setLNameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
    setUserEmailError("");
    setPasswordError("");
    setFNameError("");
    setLNameError("");
  }, [userEmail, pwd, fName, lName]);

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!fName.trim()) {
      setFNameError("Please enter your first name");
      isValid = false;
    }

    if (!lName.trim()) {
      setLNameError("Please enter your last name");
      isValid = false;
    }

    if (!userEmail.trim()) {
      setUserEmailError("Please enter your email address");
      isValid = false;
    } else if (!emailRegex.test(userEmail)) {
      setUserEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!pwd.trim()) {
      setPasswordError("Please enter your password");
      isValid = false;
    } else if (!passwordRegex.test(pwd)) {
      setPasswordError(
        "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number"
      );
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setSuccessMsg("Registration Successful");
      setIsLoading(true);
      // Implement register logic
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={4}>
        {/* <Typography variant="h4" component="h1" gutterBottom>
          TRIPPY
        </Typography> */}
        <Typography variant="h5" component="h2" gutterBottom>
          Register for a new account
        </Typography>
      </Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            error={!!fNameError}
            helperText={fNameError}
            onChange={(e) => setFName(e.target.value)}
            value={fName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            error={!!lNameError}
            helperText={lNameError}
            onChange={(e) => setLName(e.target.value)}
            value={lName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={!!userEmailError}
            helperText={userEmailError}
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={!!passwordError}
            helperText={passwordError}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {errMsg && <Typography color="error">{errMsg}</Typography>}
          <Typography variant="body2" color="text.secondary" align="center">
            Already have an account? <Link to="/">Login</Link>
          </Typography>
          {successMsg && (
            <Alert severity="success" sx={{ mt: 4 }}>
              {successMsg}
            </Alert>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Register;
