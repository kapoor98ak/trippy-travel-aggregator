import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button, TextField, Checkbox, FormControlLabel, FormGroup, Grid,
    Typography, TextareaAutosize, Container, Input
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import tripSchema from '../functions/tripSchema';
import TextareaWrapper from '../components/TextareaWrapper';
import sendDataToBackend from '../functions/sendDataToBackend';

const AddTripPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [occupancy, setOccupancy] = useState('');
    const [itinerary, setItinerary] = useState('');
    const [amenities, setAmenities] = useState({
        wifi: false,
        meals: false,
        parking: false,
        guide: false
    });
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState([]);

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

    const addTripClick = async(e) => {
        e.preventDefault();
        const formData = {
            title,
            source,
            destination,
            startDate,
            endDate,
            price,
            occupancy,
            itinerary,
            files
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
            }
            else {
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
                        <TextareaWrapper
                            value={itinerary}
                            onChange={(e) => setItinerary(e.target.value)}
                            placeholder="Type your itinerary here"
                            error={!!errors.itinerary}
                            helperText={errors.itinerary}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Upload Images
                        </Typography>
                        <Input
                            type="file"
                            inputProps={{ multiple: true, accept: "image/*" }}
                            onChange={handleFileChange}
                        />
                        {errors.files && <p style={{ color: 'red' }}>{errors.files}</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {files.map((file, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview-${index}`}
                                        style={{ width: '100%', height: 'auto' }}
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
