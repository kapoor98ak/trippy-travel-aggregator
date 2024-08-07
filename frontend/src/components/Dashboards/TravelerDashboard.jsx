import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
  Tab,
} from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import axiosInstance from '../../api/Axios';
import { format } from 'date-fns';

const TravelerDashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState('registered');
  const [trips, setTrips] = useState({
    upcoming: [],
    past: [],
    requested: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/trips/traveler/trips', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrips({
          upcoming: response.data.upcomingTrips || [],
          past: response.data.pastTrips || [],
          requested: response.data.requestedTrips || [],
        });
      } catch (error) {
        console.error('Error fetching trips:', error);
        setError('Failed to load trips. Please try again.');
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
    navigate(`/trip/${id}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRequestTabClick = () => {
    navigate('/display-requests');
  };

  const renderTrips = (tripList) => {
    if (!tripList || tripList.length === 0) {
      return <Typography>No trips available.</Typography>;
    }
    return tripList.map((trip) => (
      <Grid item xs={12} sm={6} md={4} key={trip._id}>
        <Card>
          <CardActionArea onClick={() => handleCardClick(trip._id)}>
            <CardMedia
              component="img"
              alt={trip.title}
              height="140"
              image={trip.images && trip.images.length > 0 ? `data:image/jpeg;base64,${trip.images[0]}` : '/path/to/default/image.jpg'}
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
                ${trip.price}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                From {format(new Date(trip.startDate), 'MMMM dd, yyyy')} to {format(new Date(trip.endDate), 'MMMM dd, yyyy')}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        {error ? (
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
                  <Tab label="Requested Trips" value="requested" onClick={handleRequestTabClick} />
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
          </>
        )}
      </Box>
    </Container>
  );
};

export default TravelerDashboard;
