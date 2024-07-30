import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Grid, Card, CardMedia, CardContent, Typography, Button, IconButton, Tooltip, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import MapIcon from '@mui/icons-material/Map';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrailAgentDashboard = () => {
  const navigate = useNavigate();
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/trips/agent', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const trips = response.data;

        const now = new Date();
        const upcoming = trips.filter(trip => new Date(trip.endDate) > now);
        const past = trips.filter(trip => new Date(trip.endDate) <= now);

        setUpcomingTrips(upcoming);
        setPastTrips(past);
      } catch (error) {
        console.error("Error fetching trips:", error);
        toast.error("Failed to fetch trips.");
      }
    };

    fetchTrips();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edittrip/${id}`);
  };

  const handleSchedule = (id) => {
    // Implement scheduling logic here
    console.log("Schedule trip:", id);
  };

  const handleCardClick = (id) => {
    navigate(`/trip-details/${id}`);
  };

  const renderTripCard = (trip, isUpcoming) => (
    <Grid item xs={12} sm={6} md={4} key={trip._id}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <CardMedia
            component="img"
            height="140"
            image={`data:image/jpeg;base64,${trip.images[0]}` || 'default-image-url'}
            alt={trip.title}
            onClick={() => handleCardClick(trip._id)}
            sx={{ cursor: 'pointer' }}
          />
          <CardContent sx={{ padding: 2 }}>
            <Typography gutterBottom variant="h5" component="div" noWrap>
              {trip.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" noWrap>
              {trip.source} to {trip.destination}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" noWrap>
              Price: ${trip.price}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" noWrap>
              Start Date: {new Date(trip.startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" noWrap>
              End Date: {new Date(trip.endDate).toLocaleDateString()}
            </Typography>
            <Box mt={1}>
              {trip.amenities.wifi && <Tooltip title="WiFi"><IconButton><WifiIcon /></IconButton></Tooltip>}
              {trip.amenities.meals && <Tooltip title="Meals"><IconButton><RestaurantIcon /></IconButton></Tooltip>}
              {trip.amenities.parking && <Tooltip title="Parking"><IconButton><LocalParkingIcon /></IconButton></Tooltip>}
              {trip.amenities.guide && <Tooltip title="Guide"><IconButton><MapIcon /></IconButton></Tooltip>}
            </Box>
          </CardContent>
        </Box>
        {isUpcoming && (
          <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(trip._id)}
              sx={{ marginRight: 1 }}
              fullWidth
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ScheduleIcon />}
              onClick={() => handleSchedule(trip._id)}
              fullWidth
            >
              Schedule
            </Button>
          </Box>
        )}
      </Card>
    </Grid>
  );

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 3, marginBottom: 2 }}>
        Upcoming Trips
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: 5 }}>
        {upcomingTrips.map(trip => renderTripCard(trip, true))}
      </Grid>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 3, marginBottom: 2 }}>
        Past Trips
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: 5 }}>
        {pastTrips.map(trip => renderTripCard(trip, false))}
      </Grid>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 3, marginBottom: 2 }}>
        Personalized Travel Requests
      </Typography>
    </Container>
  );
};

export default TrailAgentDashboard;
