import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  Container,
  Input,
  FormHelperText,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { tripSchema } from "../functions/tripSchema";
import sendDataToBackend from "../functions/addTrip";

const AddTripPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [itinerary, setItinerary] = useState([
    { locationName: "", description: "", visitDate: "" },
  ]);
  const [amenities, setAmenities] = useState({
    wifi: false,
    meals: false,
    parking: false,
    guide: false,
  });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);

  const handleCheckboxChange = (event) => {
    setAmenities({ ...amenities, [event.target.name]: event.target.checked });
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

    const filteredFiles = selectedFiles.filter((file) =>
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
    setItinerary([
      ...itinerary,
      { locationName: "", description: "", visitDate: "" },
    ]);
  };

  const removeItineraryItem = (index) => {
    const newItinerary = [...itinerary];
    newItinerary.splice(index, 1);
    setItinerary(newItinerary);
  };

  const addTripClick = async (e) => {
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
      amenities: JSON.stringify(amenities),
    };
    try {
      tripSchema.parse(formData);
      setErrors({});
      await sendDataToBackend(formData);

      toast.success("Form submitted successfully");
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error("Please fill all the required fields correctly");
        const newErrors = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else {
        toast.error("Failed to submit the form");
        console.error("Error submitting form:", err);
      }
    }
  };

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: 120 }}>
        <Typography variant="h4" gutterBottom align="center">
          Add a new trip
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
                  control={
                    <Checkbox
                      checked={amenities[amenity]}
                      onChange={handleCheckboxChange}
                      name={amenity}
                    />
                  }
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
              <div key={index} style={{ marginBottom: "20px" }}>
                <TextField
                  label="Location Name"
                  variant="outlined"
                  fullWidth
                  value={item.locationName}
                  onChange={(e) =>
                    handleItineraryChange(index, "locationName", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                  error={!!errors.itinerary}
                  helperText={errors.itinerary}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={item.description}
                  onChange={(e) =>
                    handleItineraryChange(index, "description", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                  error={!!errors.itinerary}
                  helperText={errors.itinerary}
                />
                <TextField
                  label="Visit Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={item.visitDate}
                  onChange={(e) =>
                    handleItineraryChange(index, "visitDate", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                  error={!!errors.itinerary}
                  helperText={errors.itinerary}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeItineraryItem(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={addItineraryItem}
            >
              Add Itinerary Item
            </Button>
            <FormHelperText error={!!errors.itinerary}>
              {errors.itinerary}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Upload Images
            </Typography>
            <Input
              type="file"
              inputProps={{ multiple: true, accept: "image/*" }}
              onChange={handleFileChange}
              error={!!errors.files}
            />
            <FormHelperText error={!!errors.files}>
              {errors.files}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {files.map((file, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 48 }}>
            <Button variant="contained" color="primary" onClick={addTripClick}>
              Add Trip
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddTripPage;
