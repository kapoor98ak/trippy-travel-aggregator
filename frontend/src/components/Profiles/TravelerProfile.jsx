import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

function TravelerProfile() {
  // Initialize state from local storage or default values
  const getUserData = JSON.parse(localStorage.getItem('user'))
  console.log("user", getUserData)
  // State hooks for user profile data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [contact, setContact] = useState('');
  const [bio, setBio] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    console.log("init")
    if (getUserData._id) {
      axios.get(`${import.meta.env.VITE_API_URL}/user/get-profile/${getUserData._id}`)
        .then(response => {
          console.log("hrllo",response)
          if (response.data.success) {
            const data = response.data.data;
            //setId(data._id);
            console.log(data);
            setFirstName(data?.firstName);
            setLastName(data?.lastName);
            setEmail(data?.email);
            setCity(data?.city);
            setCountry(data?.country);
            setAge(data?.age);
            setGender(data?.gender);
            setUsername(data?.username);
            setWebsite(data?.website);
            setContact(data?.contact);
            setBio(data?.bio);
          }
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [getUserData._id]);

  // Validate contact number
  const validateContact = (contact) => {
    const regex = /^\+?([0-9]{1,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regex.test(String(contact));
  };

  // Handle profile update
  const handleSave = async () => {
    let id = getUserData._id
    console.log(id)
    if (!validateContact(contact)) {
      alert("Please enter a valid contact number.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/update-profile`, {
        id,
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
