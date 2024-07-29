import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';

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
};

const TravelerDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/trip-details/${id}`);
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
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
    </Box>
  );
};

export default TravelerDashboard;
