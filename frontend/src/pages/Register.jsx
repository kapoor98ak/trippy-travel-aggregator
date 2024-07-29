import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/Axios.jsx";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";

const registerUrl = "/auth/register";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    userEmail: "",
    pwd: "",
    role: "traveler",
    agencyBin: "",
    agencyName: "",
    agencyAddress: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
    setErrors({});
  }, [formData]);

  const validateInputs = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let tempErrors = {};

    if (!formData.fName.trim()) {
      tempErrors.fName = "Please enter your first name";
    }
    if (!formData.lName.trim()) {
      tempErrors.lName = "Please enter your last name";
    }
    if (!formData.userEmail.trim()) {
      tempErrors.userEmail = "Please enter your email address";
    } else if (!emailRegex.test(formData.userEmail)) {
      tempErrors.userEmail = "Please enter a valid email address";
    }
    if (!formData.pwd.trim()) {
      tempErrors.pwd = "Please enter your password";
    } else if (!passwordRegex.test(formData.pwd)) {
      tempErrors.pwd =
        "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number";
    }
    if (formData.role === "agent") {
      if (!formData.agencyBin.trim()) {
        tempErrors.agencyBin = "Please enter the agency BIN number";
      }
      if (!formData.agencyName.trim()) {
        tempErrors.agencyName = "Please enter the agency name";
      }
      if (!formData.agencyAddress.trim()) {
        tempErrors.agencyAddress = "Please enter the agency address";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(registerUrl, {
        firstName: formData.fName,
        lastName: formData.lName,
        email: formData.userEmail,
        password: formData.pwd,
        role: formData.role,
        agency_bin: formData.agencyBin,
        agency_name: formData.agencyName,
        agency_address: formData.agencyAddress,
      });

      if (response.data.user && response.data.token) {
        setSuccessMsg("Registration Successful!");
        // Further actions, e.g., navigate to a different page
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      let errorMessage = "Registration Failed";
      if (!err?.response) {
        errorMessage = "No Server Response";
      } else if (err.response?.status === 409) {
        errorMessage = "User with same email already exists";
      } else if (err.response?.status === 400) {
        errorMessage = "Validation Failed";
      }
      setErrMsg(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.checked ? "agent" : "traveler",
      agencyBin: "",
      agencyName: "",
      agencyAddress: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={8}>
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
            id="fName"
            label="First Name"
            name="fName"
            autoComplete="given-name"
            autoFocus
            error={!!errors.fName}
            helperText={errors.fName}
            onChange={handleInputChange}
            value={formData.fName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lName"
            label="Last Name"
            name="lName"
            autoComplete="family-name"
            error={!!errors.lName}
            helperText={errors.lName}
            onChange={handleInputChange}
            value={formData.lName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="userEmail"
            label="Email Address"
            name="userEmail"
            autoComplete="email"
            error={!!errors.userEmail}
            helperText={errors.userEmail}
            onChange={handleInputChange}
            value={formData.userEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pwd"
            label="Password"
            type="password"
            id="pwd"
            autoComplete="new-password"
            error={!!errors.pwd}
            helperText={errors.pwd}
            onChange={handleInputChange}
            value={formData.pwd}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.role === "agent"}
                onChange={handleRoleChange}
                name="role"
                color="primary"
              />
            }
            label="Register as a Travel Agent"
            sx={{ mt: 2 }}
          />
          {formData.role === "agent" && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="agencyBin"
                label="Agency BIN Number"
                name="agencyBin"
                autoComplete="agency-bin"
                error={!!errors.agencyBin}
                helperText={errors.agencyBin}
                onChange={handleInputChange}
                value={formData.agencyBin}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="agencyName"
                label="Agency Name"
                name="agencyName"
                autoComplete="agency-name"
                error={!!errors.agencyName}
                helperText={errors.agencyName}
                onChange={handleInputChange}
                value={formData.agencyName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="agencyAddress"
                label="Agency Address"
                name="agencyAddress"
                autoComplete="agency-address"
                error={!!errors.agencyAddress}
                helperText={errors.agencyAddress}
                onChange={handleInputChange}
                value={formData.agencyAddress}
              />
            </>
          )}
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
            Already have an account? <Link to="/login">Login</Link>
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
