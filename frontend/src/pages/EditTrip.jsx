import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, TextField, Checkbox, FormControlLabel, FormGroup, Grid,
  Typography, Container, Input, FormHelperText, Box
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import { tripSchema } from '../functions/tripSchema';
import axios from 'axios';
import sendDataToBackendForEditTrip from '../functions/editTrip';

const EditTripPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [occupancy, setOccupancy] = useState('');
  const [itinerary, setItinerary] = useState([{ locationName: '', description: '', visitDate: '' }]);
  const [amenities, setAmenities] = useState({
    wifi: false,
    meals: false,
    parking: false,
    guide: false
  });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await axios.get(`https://csci-5709-project.onrender.com/api/trips/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const trip = response.data;
        setTitle(trip.title);
        setSource(trip.source);
        setDestination(trip.destination);
        setStartDate(trip.startDate.split('T')[0]);
        setEndDate(trip.endDate.split('T')[0]);
        setPrice(String(trip.price));  // Convert to string
        setOccupancy(String(trip.capacity));
        console.log("Fetched trip itinerary:", trip.itinerary);

        setItinerary(trip.itinerary.map((item) => ({
          locationName: item.locationName,
          description: item.description,
          visitDate: item.visitDate.split('T')[0]
        })));
        setAmenities(trip.amenities);
        setFiles(trip.images.map((img, index) => ({
          base64: img,
          name: `image-${index}`
        })));
      } catch (error) {
        console.error('Error fetching trip data:', error);
        toast.error('Error fetching trip data.');
      }
    };

    fetchTripData();
  }, [id]);

  const handleCheckboxChange = (event) => {
    setAmenities({ ...amenities, [event.target.name]: event.target.checked });
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const filteredFiles = selectedFiles.filter(file =>
      validImageTypes.includes(file.type)
    );

    if (filteredFiles.length !== selectedFiles.length) {
      toast.error("Only image files (jpeg, png, gif) are allowed.");
    }

    setFiles(filteredFiles);
  };

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const addItineraryItem = () => {
    setItinerary([...itinerary, { locationName: '', description: '', visitDate: '' }]);
  };

  const removeItineraryItem = (index) => {
    const newItinerary = [...itinerary];
    newItinerary.splice(index, 1);
    setItinerary(newItinerary);
  };

  const editTripClick = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      source,
      destination,
      startDate,
      endDate,
      price,
      occupancy,
      itinerary: JSON.stringify(itinerary),
      files,
      amenities: JSON.stringify(amenities)
    };

    const filesToValidate = files.filter(file => file instanceof File);

    try {
      tripSchema.parse({
        ...formData,
        files: filesToValidate
      });
      setErrors({});
      await sendDataToBackendForEditTrip(formData, id);

      toast.success("Trip updated successfully");

      setTimeout(() => {
        navigate("/dashboard");
      }, 3500);
      
      
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error("Please fill all the required fields correctly");
        const newErrors = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else {
        toast.error("Failed to update the trip");
        console.error("Error updating trip:", err);
      }
    }
  };

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: 120 }}>
        <Typography variant="h4" gutterBottom align="center">
          Edit Trip
        </Typography>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title of the trip"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Source of the trip"
              variant="outlined"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              error={!!errors.source}
              helperText={errors.source}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Destination of the trip"
              variant="outlined"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              error={!!errors.destination}
              helperText={errors.destination}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date of the Journey"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date of the Journey"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.endDate}
              helperText={errors.endDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price of the trip"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Maximum Occupancy"
              variant="outlined"
              value={occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
              error={!!errors.occupancy}
              helperText={errors.occupancy}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Amenities
            </Typography>
            <FormGroup row>
              {Object.keys(amenities).map((amenity) => (
                <FormControlLabel
                  key={amenity}
                  control={<Checkbox checked={amenities[amenity]} onChange={handleCheckboxChange} name={amenity} />}
                  label={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Day-to-day Itinerary
            </Typography>
            {itinerary.map((item, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <TextField
                  label="Location Name"
                  variant="outlined"
                  fullWidth
                  value={item.locationName}
                  onChange={(e) => handleItineraryChange(index, 'locationName', e.target.value)}
                  style={{ marginBottom: '10px' }}
                  error={!!errors.itinerary}
                  helperText={errors.itinerary}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={item.description}
                  onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                  style={{ marginBottom: '10px' }}
                  error={!!errors.itinerary}
                  helperText={errors.itinerary}
                />
                <TextField
                  label="Visit Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={item.visitDate}
                  onChange={(e) => handleItineraryChange(index, 'visitDate', e.target.value)}
                  style={{ marginBottom: '10px' }}
                  error={!!errors.itinerary}
                  helperText={errors.itinerary}
                />
                <Button variant="contained" color="secondary" onClick={() => removeItineraryItem(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="contained" color="primary" onClick={addItineraryItem}>
              Add Itinerary Item
            </Button>
            <FormHelperText error={!!errors.itinerary}>{errors.itinerary}</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Upload Images
            </Typography>
            <FormHelperText>Please upload new images. The images shown below are the previously uploaded images and they will be replaced.</FormHelperText>

            <Input
              type="file"
              inputProps={{ multiple: true, accept: "image/*" }}
              onChange={handleFileChange}
              error={!!errors.files}
            />
            <FormHelperText error={!!errors.files}>{errors.files}</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {files.map((file, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <img
                    src={file.base64 ? `data:image/jpeg;base64,${file.base64}` : URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 48 }}>
            <Button variant="contained" color="primary" onClick={editTripClick}>
              Update Trip
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditTripPage;
