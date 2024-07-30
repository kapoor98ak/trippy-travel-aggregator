import React, { useState } from 'react';
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

const trips = {
  upcoming: [
    { id: 4, title: 'Trip 4 - Kerala', date: '06/05/2024', price: '$70.00' },
    { id: 5, title: 'Trip 5 - Maharashtra', date: '17/05/2024', price: '$XX.YY' },
    { id: 6, title: 'Trip 6 - Manali', date: '29/05/2024', price: '$XX.YY' },
  ],
  past: [
    { id: 1, title: 'Trip 1 - Location', date: '12/01/2024', price: '$XX.YY' },
    { id: 2, title: 'Trip 2 - Location', date: '18/03/2024', price: '$XX.YY' },
    { id: 3, title: 'Trip 3 - Location', date: '25/04/2024', price: '$XX.YY' },
  ],
  requested: [
    { id: 7, title: 'Trip 7 - Goa', date: '15/06/2024', price: '$YY.ZZ' },
    { id: 8, title: 'Trip 8 - Ladakh', date: '22/07/2024', price: '$ZZ.AA' },
  ],
  available: [
    { id: 9, title: 'Trip 9 - Shimla', date: '10/08/2024', price: '$XX.YY' },
    { id: 10, title: 'Trip 10 - Jaipur', date: '20/09/2024', price: '$YY.ZZ' },
  ],
};

const TravelerDashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState('registered');

  const handleCardClick = (id) => {
    navigate(`/trip-details/${id}`);
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
        <Button variant="contained" color="secondary" onClick={() => navigate('/explore-trips')}>
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
                <CardActionArea onClick={() => handleCardClick(trip.id)}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{trip.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {trip.date}
                      </Typography>
                      <Typography variant="body1">{trip.price}</Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Past Trips
          </Typography>
          <Grid container spacing={2}>
            {trips.past.map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip.id}>
                <CardActionArea onClick={() => handleCardClick(trip.id)}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{trip.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {trip.date}
                      </Typography>
                      <Typography variant="body1">{trip.price}</Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
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
                <CardActionArea onClick={() => handleCardClick(trip.id)}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{trip.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {trip.date}
                      </Typography>
                      <Typography variant="body1">{trip.price}</Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TravelerDashboard;
