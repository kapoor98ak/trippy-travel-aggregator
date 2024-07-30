import React, { useState } from "react";
import axiosInstance from "../../api/Axios";
import { toast } from "react-toastify";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

const AgentProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [agency, setAgency] = useState(user.agency);

  const handleUpdateProfile = async () => {
    try {
      const response = await axiosInstance.put("/user/profile", {
        firstName,
        lastName,
        email,
        agency,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom mt={4}>
        Agent Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <TextField
            fullWidth
            label="Agency"
            variant="outlined"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
          />
        </Grid> */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdateProfile}
          >
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AgentProfile;
