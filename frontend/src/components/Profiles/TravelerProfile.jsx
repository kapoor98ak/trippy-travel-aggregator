import React from 'react';
import { TextField, Button, Box, Typography, Avatar, Grid } from '@mui/material';

export default class TravelerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Sophia',
      lastName: 'Lauren',
      city: 'Halifax',
      country: 'Canada',
      age: '32',
      gender: 'Female',
      username: '@username123',
      email: 'email@domain.com',
      website: 'website.net',
      contact: '+1 780 847 7463',
      bio: 'I am a traveler, like to explore new places.',
      editable: false
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateContact = (contact) => {
    const re = /^\+?([0-9]{1,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(String(contact));
  }

  handleSave = () => {
    if (!this.validateEmail(this.state.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!this.validateContact(this.state.contact)) {
      alert("Please enter a valid contact number.");
      return;
    }
    this.toggleEdit();
    // Here you would typically also save to a backend service
  }

  render() {
    const { editable } = this.state;
    return (
      <Box sx={{ flexGrow: 1, m: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom component="div">
          User Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              variant="outlined"
              value={this.state.firstName}
              onChange={this.handleChange}
              name="firstName"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={this.state.lastName}
              onChange={this.handleChange}
              name="lastName"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="City"
              variant="outlined"
              value={this.state.city}
              onChange={this.handleChange}
              name="city"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="Country"
              variant="outlined"
              value={this.state.country}
              onChange={this.handleChange}
              name="country"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="Age"
              variant="outlined"
              value={this.state.age}
              onChange={this.handleChange}
              name="age"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="Gender"
              variant="outlined"
              value={this.state.gender}
              onChange={this.handleChange}
              name="gender"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src="path_to_avatar.jpg"
                sx={{
                  width: { xs: 40, sm: 56 },
                  height: { xs: 40, sm: 56 }
                }}
              />
              {editable && <Button variant="outlined">Change profile photo</Button>}
            </Box>
            <TextField
              label="Username"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="Website"
              variant="outlined"
              value={this.state.website}
              onChange={this.handleChange}
              name="website"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="Contact"
              variant="outlined"
              value={this.state.contact}
              onChange={this.handleChange}
              name="contact"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="Bio"
              variant="outlined"
              multiline
              rows={4}
              value={this.state.bio}
              onChange={this.handleChange}
              name="bio"
              fullWidth
              margin="normal"
              disabled={!editable}
            />
          </Grid>
        </Grid>
        {editable ? (
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={this.handleSave}>
            Save Changes
          </Button>
        ) : (
          <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={this.toggleEdit}>
            Edit
          </Button>
          
        )}
      </Box>
    );
  }
}
