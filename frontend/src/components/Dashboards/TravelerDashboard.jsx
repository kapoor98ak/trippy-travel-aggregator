import React, { useState } from 'react';
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

const trips = {
  upcoming: [
    {
      id: 4,
      title: 'Trip 4 - Kerala',
      date: '06/05/2024',
      price: '$70.00',
      description: 'Explore the beautiful backwaters of Kerala.',
      location: 'Kerala, India',
      duration: '5 days',
      image: 'https://images.unsplash.com/photo-1561463383-35aa9b4dc968?q=80&w=400&h=200&fit=crop',
    },
    {
      id: 5,
      title: 'Trip 5 - Maharashtra',
      date: '17/05/2024',
      price: '$80.00',
      description: 'Experience the vibrant culture of Maharashtra.',
      location: 'Maharashtra, India',
      duration: '7 days',
      image: 'https://images.unsplash.com/photo-1595460069761-8f0c7f1a3f3c?q=80&w=400&h=200&fit=crop',
    },
    {
      id: 6,
      title: 'Trip 6 - Manali',
      date: '29/05/2024',
      price: '$90.00',
      description: 'Enjoy the scenic beauty of Manali.',
      location: 'Manali, India',
      duration: '6 days',
      image: 'https://images.unsplash.com/photo-1605706880326-34b6eb091e30?q=80&w=400&h=200&fit=crop',
    },
  ],
  past: [
    {
      id: 1,
      title: 'Trip 1 - Location',
      date: '12/01/2024',
      price: '$50.00',
      description: 'Discover the wonders of this location.',
      location: 'Location, Country',
      duration: '3 days',
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=400&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Trip 2 - Location',
      date: '18/03/2024',
      price: '$60.00',
      description: 'Experience the beauty of this place.',
      location: 'Location, Country',
      duration: '4 days',
      image: 'https://images.unsplash.com/photo-1533591954242-a860db7c09a1?q=80&w=400&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Trip 3 - Location',
      date: '25/04/2024',
      price: '$70.00',
      description: 'Enjoy the scenic landscapes here.',
      location: 'Location, Country',
      duration: '5 days',
      image: 'https://images.unsplash.com/photo-1516912910201-9a37068d4e9f?q=80&w=400&h=200&fit=crop',
    },
  ],
  requested: [
    {
      id: 7,
      title: 'Trip 7 - Goa',
      date: '15/06/2024',
      price: '$100.00',
      description: 'Relax on the sunny beaches of Goa.',
      location: 'Goa, India',
      duration: '4 days',
      image: 'https://images.unsplash.com/photo-1582719444781-57f98416c05a?q=80&w=400&h=200&fit=crop',
    },
    {
      id: 8,
      title: 'Trip 8 - Ladakh',
      date: '22/07/2024',
      price: '$110.00',
      description: 'Experience the high-altitude desert of Ladakh.',
      location: 'Ladakh, India',
      duration: '6 days',
      image: 'https://images.unsplash.com/photo-1597586779336-13e7a254f12c?q=80&w=400&h=200&fit=crop',
    },
  ],
  available: [
    {
      id: 9,
      title: 'Trip 9 - Shimla',
      date: '10/08/2024',
      price: '$120.00',
      description: 'Visit the charming hill station of Shimla.',
      location: 'Shimla, India',
      duration: '5 days',
      image: 'https://images.unsplash.com/photo-1545111077-b771c9be8708?q=80&w=400&h=200&fit=crop',
    },
    {
      id: 10,
      title: 'Trip 10 - Jaipur',
      date: '20/09/2024',
      price: '$130.00',
      description: 'Explore the pink city of Jaipur.',
      location: 'Jaipur, India',
      duration: '4 days',
      image: 'https://images.unsplash.com/photo-1537005695808-0dc5059f6b1b?q=80&w=400&h=200&fit=crop',
    },
  ],
};

const TravelerDashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState('registered');

  const handleCardClick = (id) => {
    navigate(`/tripdetail/${id}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/request-trip')}>
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
            {trips.upcoming.map((trip) => (
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
            ))}
          </Grid>
          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Past Trips
          </Typography>
          <Grid container spacing={2}>
            {trips.past.map((trip) => (
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
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value="requested">
          <Typography variant="h4" gutterBottom>
            Requested Trips
          </Typography>
          <Grid container spacing={2}>
            {trips.requested.map((trip) => (
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
            ))}
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TravelerDashboard;
