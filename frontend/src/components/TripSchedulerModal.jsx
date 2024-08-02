import React, { useState } from 'react';
import {
    Modal, Box, Typography, TextField, Button
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const TripSchedulerModal = ({ open, handleClose, tripId }) => {
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  const handleRescheduleClick = async () => {
    if (new Date(newStartDate) > new Date(newEndDate)) {
      toast.error("Start date cannot be later than end date.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://csci-5709-project.onrender.com/api/trips/${tripId}/reschedule`, {
        startDate: newStartDate,
        endDate: newEndDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Trip rescheduled successfully.");
      handleClose();
    } catch (error) {
      toast.error("Failed to reschedule the trip.");
      console.error("Error rescheduling trip:", error);
    }
  };

  const handleCancelClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://csci-5709-project.onrender.com/api/trips/${tripId}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Trip canceled successfully.");
      handleClose();
    } catch (error) {
      toast.error("Failed to cancel the trip.");
      console.error("Error canceling trip:", error);
    }
  };

  return (
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ 
            width: 400, 
            bgcolor: 'background.paper', 
            p: 4, 
            borderRadius: 2, 
            mx: 'auto', 
            mt: 5, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 4 
          }}>
            <Typography variant="h6" component="h2">
              Schedule Options
            </Typography>
            <Typography variant="body2" component="p">
              Choose an option to reschedule or cancel the trip.
            </Typography>
            <TextField
              label="New Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
              fullWidth
            />
            <TextField
              label="New End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              fullWidth
            />
           
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleRescheduleClick} color="primary">
                Reschedule
              </Button>
              <Button onClick={handleCancelClick} color="secondary">
                Cancel Trip
              </Button>
            </Box>
          </Box>
        </Modal>
      );
    };
    
    
    
export default TripSchedulerModal;
