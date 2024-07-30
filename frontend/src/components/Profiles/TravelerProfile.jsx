import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TravelerProfile() {
  // Fetch user data from local storage and initialize state
  const getUserData = () => JSON.parse(localStorage.getItem('auth'))?.user || {};

  // State hooks for each user field
  const [userData, setUserData] = useState(getUserData());
  const [_id, setId] = useState(userData._id || '');
  const [city, setCity] = useState(userData.city || '');
  const [country, setCountry] = useState(userData.country || '');
  const [age, setAge] = useState(userData.age || '');
  const [gender, setGender] = useState(userData.gender || '');
  const [username, setUsername] = useState(userData.username || '');
  const [website, setWebsite] = useState(userData.website || '');
  const [contact, setContact] = useState(userData.contact || '');
  const [bio, setBio] = useState(userData.bio || '');

  // Fetch profile data from the server
  useEffect(() => {
    if (userData._id) {
      axios.get(`http://localhost:3000/api/users/get-profile/${userData._id}`)
        .then(response => {
          console.log(response)
          if (response.data.success) {
            const { _id, city, country, age, gender, username, website, contact, bio } = response.data.data;
            setId(_id);
            setCity(city);
            setCountry(country);
            setAge(age);
            setGender(gender);
            setUsername(username);
            setWebsite(website);
            setContact(contact);
            setBio(bio);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the profile!', error);
        });
    }
  }, [userData._id]);  // Depending on userData._id to refetch when it changes

  // Validate contact number
  const validateContact = (contact) => {
    const regex = /^[0-9]{10}$/;  // Example: Validates a 10-digit number
    return regex.test(contact);
  };

  // Handle form submission to update profile
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
      console.error('There was an error updating the profile!', error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        <input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="text" placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} />
        <input type="text" placeholder="Contact" value={contact} onChange={e => setContact(e.target.value)} />
        <textarea placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default TravelerProfile;
