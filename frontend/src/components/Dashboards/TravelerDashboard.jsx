import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';

const TravelerDashboard = () => {
  // Initialize states
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [requestedTrips, setRequestedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch Upcoming Trips
  const fetchUpcomingTrips = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/booking/traveler/${user._id}/upcoming`);
      console.log(response.data)
      setUpcomingTrips(Array.isArray(response.data) ? response.data : []); // Ensure the response is an array
    } catch (error) {
      console.error('Error fetching upcoming trips:', error);
      setUpcomingTrips([]); // Set to an empty array if there's an error
      setError('Error fetching upcoming trips'); // Set error message
    }
  };

  // Fetch Past Trips
  const fetchPastTrips = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/booking/traveler/${user._id}/past`);
      console.log(response.data)
      setPastTrips(Array.isArray(response.data) ? response.data : []); // Ensure the response is an array
    } catch (error) {
      console.error('Error fetching past trips:', error);
      setPastTrips([]); // Set to an empty array if there's an error
      setError('Error fetching past trips'); // Set error message
    }
  };

  // Fetch Requested Trips
  const fetchRequestedTrips = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/travelrequests/traveler/${user._id}`);
      console.log(response.data)
      setRequestedTrips(Array.isArray(response.data) ? response.data : []); // Ensure the response is an array
    } catch (error) {
      console.error('Error fetching requested trips:', error);
      setRequestedTrips([]); // Set to an empty array if there's an error
      setError('Error fetching requested trips'); // Set error message
    }
  };

  useEffect(() => {
    // Fetch all trips when the component mounts
    const fetchAllTrips = async () => {
      setLoading(true);
      await Promise.all([
        fetchUpcomingTrips(),
        fetchPastTrips(),
        fetchRequestedTrips(),
      ]);
      setLoading(false);
    };
    fetchAllTrips();
  }, []);

  const handleCardClick = (id, isRequested) => {
    if (isRequested) {
      navigate('/display-requests');
    } else {
      navigate(`/trip-details/${id}`);
    }
  };

  const [tabValue, setTabValue] = useState('registered');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/travel-request-form')}>
              Request New Trip
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/trips')}>
              Explore Trips
            </Button>
          </Box>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="trip tabs">
                <Tab label="Registered Trips" value="registered" />
                <Tab label="Requested Trips" value="requested" />
              </TabList>
            </Box>
            <TabPanel value="registered">
              <Typography variant="h4" gutterBottom>
                Upcoming Trips
              </Typography>
              <Grid container spacing={2}>
                {upcomingTrips.length > 0 ? (
                  upcomingTrips.map((booking) => (
                    <Grid item xs={12} sm={6} md={4} key={booking._id}>
                      <CardActionArea onClick={() => handleCardClick(booking.tripId._id, false)}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">{booking.tripId.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              Destination: {booking.tripId.destination}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Start Date: {new Date(booking.tripId.startDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              End Date: {new Date(booking.tripId.endDate).toLocaleDateString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))
                ) : (
                  <Typography>No upcoming trips found.</Typography>
                )}
              </Grid>
              <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Past Trips
              </Typography>
              <Grid container spacing={2}>
                {pastTrips.length > 0 ? (
                  pastTrips.map((booking) => (
                    <Grid item xs={12} sm={6} md={4} key={booking._id}>
                      <CardActionArea onClick={() => handleCardClick(booking.tripId._id, false)}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">{booking.tripId.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              Destination: {booking.tripId.destination}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Start Date: {new Date(booking.tripId.startDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              End Date: {new Date(booking.tripId.endDate).toLocaleDateString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))
                ) : (
                  <Typography>No past trips found.</Typography>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value="requested">
              <Typography variant="h4" gutterBottom>
                Requested Trips
              </Typography>
              <Grid container spacing={2}>
                {requestedTrips.length > 0 ? (
                  requestedTrips.map((trip) => (
                    <Grid item xs={12} sm={6} md={4} key={trip._id}>
                      <CardActionArea onClick={() => handleCardClick(trip._id, true)}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">{trip.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              Destination: {trip.destination}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Status: {trip.status}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Start Date: {new Date(trip.startDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              End Date: {new Date(trip.endDate).toLocaleDateString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))
                ) : (
                  <Typography>No requested trips found.</Typography>
                )}
              </Grid>
            </TabPanel>
          </TabContext>
        </>
      )}
    </Box>
  );
};

export default TravelerDashboard;
