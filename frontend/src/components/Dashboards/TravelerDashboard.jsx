import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
  Tab,
} from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import axios from 'axios';

const TravelerDashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState('registered');
  const [trips, setTrips] = useState({
    upcoming: [],
    past: [],
    requested: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/trips/traveler/trips'); // Adjust this URL to your actual API endpoint
        setTrips({
          upcoming: response.data.upcomingTrips || [],
          past: response.data.pastTrips || [],
          requested: response.data.requestedTrips || [],
        });
      } catch (error) {
        console.error('Error fetching trips:', error);
        setTrips({
          upcoming: [],
          past: [],
          requested: [],
        });
      }
      setLoading(false);
    };

    fetchTrips();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/tripdetail/${id}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTrips = (tripList) => {
    if (!tripList || tripList.length === 0) {
      return <Typography>No trips available.</Typography>;
    }
    return tripList.map((trip) => (
      <Grid item xs={12} sm={6} md={4} key={trip.id}>
        <Card>
          <CardActionArea onClick={() => handleCardClick(trip.id)}>
            <CardMedia
              component="img"
              alt={trip.title}
              height="140"
              image={trip.image}
              title={trip.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {trip.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {trip.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {trip.location}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {trip.price}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Duration: {trip.duration}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => handleCardClick(trip.id)}
            sx={{ m: 2 }}
          >
            Book Now
          </Button>
        </Card>
      </Grid>
    ));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
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
            <Tab label="Requested Trips" value="requested"  onClick={()=> navigate('/display-requests')} />
          </TabList>
        </Box>
        <TabPanel value="registered">
          <Typography variant="h4" gutterBottom>
            Upcoming Trips
          </Typography>
          <Grid container spacing={2}>
            {renderTrips(trips.upcoming)}
          </Grid>
          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Past Trips
          </Typography>
          <Grid container spacing={2}>
            {renderTrips(trips.past)}
          </Grid>
        </TabPanel>
        <TabPanel value="requested">
          <Typography variant="h4" gutterBottom>
            Requested Trips
          </Typography>
          <Grid container spacing={2}>
            {renderTrips(trips.requested)}
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TravelerDashboard;
