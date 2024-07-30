import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/Axios";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [filters, setFilters] = useState({
    source: "",
    destination: "",
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/trips/");
      setTrips(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching trips");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterTrips = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/trips/filter", filters);
      setTrips(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error filtering trips");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = (tripId) => {
    navigate(`/trip/${tripId}`);
  };

  return (
    <Container>
      <ToastContainer />
      <Box mt={4} mb={4} display="flex" justifyContent="center">
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ xs: "100%", sm: "80%", md: "60%" }}
          gap={2}
        >
          <TextField
            fullWidth
            label="Source"
            name="source"
            value={filters.source}
            onChange={handleFilterChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Destination"
            name="destination"
            value={filters.destination}
            onChange={handleFilterChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Start Date"
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleFilterChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="End Date"
            name="endDate"
            type="date"
            value={filters.endDate}
            onChange={handleFilterChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleFilterTrips}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Filter"}
          </Button>
        </Box>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {trips.map((trip, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  sx={{ height: 180 }}
                  image={
                    trip.images.length > 0
                      ? `data:image/jpeg;base64,${trip.images[0]}`
                      : ""
                  }
                  title={trip.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {trip.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {trip.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Source:</strong> {trip.source}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Destination:</strong> {trip.destination}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Start Date:</strong>{" "}
                    {new Date(trip.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>End Date:</strong>{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleBookNow(trip._id)}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Trips;