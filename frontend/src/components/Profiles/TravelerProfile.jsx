import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

function TravelerProfile() {
  // Initialize state from local storage or default values
  const getUserData = () => JSON.parse(localStorage.getItem('auth'))?.user || {};

  // State hooks for user profile data
  const [userData, setUserData] = useState(getUserData());
  const [_id, setId] = useState(userData._id || '');
  const [firstName, setFirstName] = useState(userData.firstName || '');
  const [lastName, setLastName] = useState(userData.lastName || '');
  const [email, setEmail] = useState(userData.email || '');
  const [city, setCity] = useState(userData.city || '');
  const [country, setCountry] = useState(userData.country || '');
  const [age, setAge] = useState(userData.age || '');
  const [gender, setGender] = useState(userData.gender || '');
  const [username, setUsername] = useState(userData.username || '');
  const [website, setWebsite] = useState(userData.website || '');
  const [contact, setContact] = useState(userData.contact || '');
  const [bio, setBio] = useState(userData.bio || '');

  // Fetch user data on component mount
  useEffect(() => {
    if (userData._id) {
      axios.get(`http://localhost:3000/api/users/get-profile/${userData._id}`)
        .then(response => {
          if (response.data.success) {
            const data = response.data.data;
            setId(data._id);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setCity(data.city);
            setCountry(data.country);
            setAge(data.age);
            setGender(data.gender);
            setUsername(data.username);
            setWebsite(data.website);
            setContact(data.contact);
            setBio(data.bio);
          }
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [userData._id]);

  // Validate contact number
  const validateContact = (contact) => {
    const regex = /^\+?([0-9]{1,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regex.test(String(contact));
  };

  // Handle profile update
  const handleSave = async () => {
    if (!validateContact(contact)) {
      alert("Please enter a valid contact number.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/update-profile', {
        _id,
        city,
        country,
        age,
        gender,
        username,
        website,
        contact,
        bio,
      });
      if (response.data.success) {
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, m: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom component="div">
        User Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="First Name" variant="outlined" value={firstName} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          <TextField label="Last Name" variant="outlined" value={lastName} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          <TextField label="Email" variant="outlined" value={email} fullWidth margin="normal" InputProps={{ readOnly: true }} />
          <TextField label="City" variant="outlined" value={city} onChange={e => setCity(e.target.value)} fullWidth margin="normal" />
          <TextField label="Country" variant="outlined" value={country} onChange={e => setCountry(e.target.value)} fullWidth margin="normal" />
          <TextField label="Age" type="number" variant="outlined" value={age} onChange={e => setAge(e.target.value)} fullWidth margin="normal" />
          <TextField
            label="Gender"
            variant="outlined"
            select
            SelectProps={{ native: true }}
            value={gender}
            onChange={e => setGender(e.target.value)}
            fullWidth
            margin="normal"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} fullWidth margin="normal" />
          <TextField label="Website" variant="outlined" value={website} onChange={e => setWebsite(e.target.value)} fullWidth margin="normal" />
          <TextField label="Contact" variant="outlined" value={contact} onChange={e => setContact(e.target.value)} fullWidth margin="normal" />
          <TextField
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            value={bio}
            onChange={e => setBio(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TravelerProfile;
