import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Tooltip, Box, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import MapIcon from '@mui/icons-material/Map';

const TripCard = ({ trip, isUpcoming, handleEdit, handleSchedule, handleCardClick }) => {
  return (
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
};

export default TripCard;
