import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripCard from "../TripCard.jsx";
import TripSchedulerModal from "../TripSchedulerModal.jsx";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://csci-5709-project.onrender.com/api/trips/agent`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const trips = response.data.filter(trip => trip.status !== "canceled");

        const now = new Date();
        const upcoming = trips.filter((trip) => new Date(trip.endDate) > now);
        const past = trips.filter((trip) => new Date(trip.endDate) <= now);
        console.log(upcoming);
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
    setSelectedTripId(id);
    setOpenModal(true);
  };

  const handleCardClick = (id) => {
    navigate(`/trip/${id}`);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Dashboard
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/addtrip")}
        >
          Create New Trip
        </Button>
      </Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ marginTop: 3, marginBottom: 2 }}
      >
        Upcoming Trips
      </Typography>
      {upcomingTrips.length === 0 ? (
        <Typography variant="body1" align="center">
          No upcoming trips.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ marginBottom: 5 }}>
          {upcomingTrips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              isUpcoming={true}
              handleEdit={handleEdit}
              handleSchedule={handleSchedule}
              handleCardClick={handleCardClick}
            />
          ))}
        </Grid>
      )}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ marginTop: 3, marginBottom: 2 }}
      >
        Past Trips
      </Typography>
      {pastTrips.length === 0 ? (
        <Typography variant="body1" align="center">
          No past trips.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ marginBottom: 5 }}>
          {pastTrips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              isUpcoming={false}
              handleEdit={handleEdit}
              handleSchedule={handleSchedule}
              handleCardClick={handleCardClick}
            />
          ))}
        </Grid>
      )}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ marginTop: 3, marginBottom: 2 }}
      >
        Personalized Travel Requests
      </Typography>
      <TripSchedulerModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        tripId={selectedTripId}
      />
    </Container>
  );
};

export default AgentDashboard;
