import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Link,
  Alert,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
    setUserEmailError("");
    setPasswordError("");
  }, [userEmail, pwd]);

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

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

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setSuccessMsg("Login Successful");
      setIsLoading(true);
      // Implement login logic
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
          Sign in to your account
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            error={!!passwordError}
            helperText={passwordError}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link
              onClick={handleForgotPassword}
              variant="body2"
              component="button"
            >
              Forgot password?
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          {errMsg && <Typography color="error">{errMsg}</Typography>}
          <Typography variant="body2" color="text.secondary" align="center">
            New User?{" "}
            <Link
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Link>
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

export default Login;
