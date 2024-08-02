import React, { useState, useContext } from 'react';
import { Box, Container, Grid, Paper, Typography, TextField, FormControlLabel, Button, InputAdornment } from '@mui/material';
import {styled } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';


import Copyright from '@mui/icons-material/Copyright';
import {toast} from "react-toastify";
import axiosInstance from "../api/Axios.jsx";
import { AuthContext } from "../context/AuthContext";


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

function TravelRequestPage() {
    const [info, setInfo] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState(0);
    const [itineraryDetails, setItineraryDetails] = useState('');
    const [numOfTravellers, setNumOfTravellers] = useState('');


    const [touched, setTouched] = useState({
        info: false,
        source: false,
        destination: false,
    });

    const [checklist, setChecklist] = useState({
        food: false,
        Accommodation: false,
        transport: false,
        guide: false,
    });

    const navigate = useNavigate()
    const { auth } = useContext(AuthContext);

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!info || !source || !destination || !startDate || !endDate || !budget || !numOfTravellers) {
            toast.error("Please fill all the required fields correctly");

        }

       // if (!auth ) {
        //     toast.error("User ID not found. Please log in again.");
        //     return;
        // }

        const travelerId = auth.user._id;
        const token = auth.token;
        if (!travelerId) {
            toast.error("Traveler ID not found. Please log in again.");
            return;
        }
        const requestData = {
            title: info,
            source:source,
            destination:destination,
            startDate :startDate.toISOString().split('T')[0],
            endDate :endDate.toISOString().split('T')[0],
            budget:budget,
            itineraryDetails:itineraryDetails,
            numOfTravellers:numOfTravellers,
            amenities: Object.keys(checklist).filter(key => checklist[key]),

        };
        console.log(token);
        try {
            const response = await axiosInstance.post('travelrequests/create-request',
                JSON.stringify(requestData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );


            const result =  response;
            if (response) {
                alert('Request created successfully');
                navigate("/display-requests")
            } else {
                toast.error('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error creating request:', error);
            toast.error('Error creating request');
        }

    };

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setChecklist((prevChecklist) => ({
            ...prevChecklist,
            [name]: checked,
        }));
    };
    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };


    return (
        <Box sx={{ display: 'flex' }}>
            {/* <SideNavBar /> */}
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <DrawerHeader />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Form Details
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2} sx={{ mt: 1 }}>
                                        <Grid item md={12} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Enter the Trip Title"
                                                value={info}
                                                onChange={(e) => setInfo(e.target.value)}
                                                onBlur={() => handleBlur('info')}
                                                error={(formSubmitted || touched.info) && info === ''}
                                                helperText={(formSubmitted || touched.info) && info === '' ? 'Please enter the trip name' : ''}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Enter Source"
                                                value={source}
                                                onChange={(e) => setSource(e.target.value)}
                                                onBlur={() => handleBlur('source')}
                                                error={(formSubmitted || touched.source) && !source}
                                                helperText={(formSubmitted || touched.source) && !source ? 'Please enter the source' : ''}
                                            />

                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Enter Destination"
                                                value={destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                                onBlur={() => handleBlur('destination')}
                                                error={(formSubmitted || touched.destination) && !destination}
                                                helperText={(formSubmitted || touched.destination) && !destination ? 'Please enter the destination' : ''}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    //value={startDate}
                                                    onChange={(newValue) => setStartDate(newValue)}
                                                    label="Enter Start Date"
                                                    renderInput={(props) => <TextField {...props} required fullWidth />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    onChange={(newValue) => setEndDate(newValue)}
                                                    label="Enter End Date"
                                                    renderInput={(props) => <TextField {...props} required fullWidth />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                label="Enter of Travellers"
                                                onChange={(e) => setNumOfTravellers(parseInt(e.target.value))}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                multiline
                                                fullWidth
                                                label="Itenary Details"
                                                onChange={(e) => setItineraryDetails(e.target.value)}
                                                // Define isEditable properly or remove if not needed
                                                InputProps={{
                                                    readOnly: false,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Enter Max Budget"
                                                type="number"
                                                onChange={(e) => setBudget(parseInt(e.target.value))}
                                                InputProps={{
                                                    readOnly: false,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={12} xs={12}>
                                            <Typography component="h3" variant="h6" color="primary">
                                                Amenities
                                            </Typography>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checklist.food}
                                                        onChange={handleChange}
                                                        name="food"
                                                    />
                                                }
                                                label="Food"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checklist.Accommodation}
                                                        onChange={handleChange}
                                                        name="Accommodation"
                                                    />
                                                }
                                                label="Accommodation"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checklist.transport}
                                                        onChange={handleChange}
                                                        name="transport"
                                                    />
                                                }
                                                label="Transport"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checklist.guide}
                                                        onChange={handleChange}
                                                        name="guide"
                                                    />
                                                }
                                                label="Guide"
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Button variant="contained" size="large" type="submit">
                                                Submit
                                            </Button>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Button variant="contained" size="large" onClick={handleBackClick}>
                                                Back
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default TravelRequestPage;
