import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, TextField, FormControlLabel, Button, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
// import SideNavBar from '../components/SideNavBar';
import Copyright from '@mui/icons-material/Copyright';

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
    const [checklist, setChecklist] = useState({
        food: false,
        Accommodation: false,
        transport: false,
        guide: false,
    });

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (info === '' || source === '' || destination === '') {
            alert('Please fill all required fields');
            return;
        } else {
            navigate('/dashboard');
        }
    };

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setChecklist((prevChecklist) => ({
            ...prevChecklist,
            [name]: checked,
        }));
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
                                                required
                                                fullWidth
                                                label="Enter the Trip Title"
                                                value={info}
                                                onChange={(e) => setInfo(e.target.value)}
                                                error={info === ''}
                                                helperText={info === '' ? 'Please enter the trip name' : ''}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Enter Source"
                                                value={source}
                                                onChange={(e) => setSource(e.target.value)}
                                                error={!source}
                                                helperText={!source ? 'Please enter the source' : ''}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Enter Destination"
                                                value={destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                                error={!destination}
                                                helperText={!destination ? 'Please enter the destination' : ''}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Enter Start Date"
                                                    renderInput={(props) => <TextField {...props} required fullWidth />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Enter End Date"
                                                    renderInput={(props) => <TextField {...props} required fullWidth />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                label="Enter Max Budget"
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
                                                // Define isEditable properly or remove if not needed
                                                InputProps={{
                                                    readOnly: false,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                multiline
                                                fullWidth
                                                label="No. of Travellers"
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
                {/* <Container component="main" sx={{ mt: 8, mb: 19 }} maxWidth="sm"></Container> */}
                {/* <Box
                    component="footer"
                    maxWidth="100"
                    sx={{
                        display: 'flex',
                        minHeight: '20',
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: 'black',
                        color: 'white',
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography variant="body1">My sticky footer can be found here.</Typography>
                        <Copyright />
                    </Container>
                </Box> */}
            </Box>
        </Box>
    );
}

export default TravelRequestPage;
