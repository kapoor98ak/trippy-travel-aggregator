import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/Axios.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import ImageCarousel from "../components/ImageCarousel.jsx";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PeopleIcon from "@mui/icons-material/People";
import FilterHdrIcon from "@mui/icons-material/FilterHdr";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
} from "@react-google-maps/api";

import {
  Container,
  Typography,
  Stack,
  Box,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  CircularProgress,
  Modal,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const TripDetail = () => {
  const navigate = useNavigate();
  let { tripId } = useParams();
  const { auth } = useContext(AuthContext);
  const [tripDetails, setTripDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const currentDate = new Date().toISOString();
  const [totalTravelers, setTotalTravelers] = useState(1);
  const [travelerDetails, setTravelerDetails] = useState({
    phone: "",
    age: "",
    gender: "",
    emergencyContact: { name: "", phone: "" },
  });
  const amenityMap = {
    meals: { icon: <LocalDiningIcon />, label: "Food" },
    stay: { icon: <SingleBedIcon />, label: "Stay" },
    activities: { icon: <SportsFootballIcon />, label: "Activities" },
    firstAid: { icon: <MedicalServicesIcon />, label: "First Aid" },
    travelling: { icon: <DirectionsBusIcon />, label: "Travelling" },
    guide: { icon: <PersonPinIcon />, label: "Guide" },
  };

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axiosInstance.get(`/trips/${tripId}`);
        setTripDetails(response.data);
        const getReviews = await axiosInstance.get(`/review/${tripId}`);
        setReviews(getReviews.data);
       
      } catch (error) {
        console.error("Error fetching trip details:", error);
        setError("Failed to load trip details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  const handleAddReview = () => {
    if (!auth.user) {
      toast.error("You need to be logged in to add a review.");
      return;
    }
    setShowReviewModal(true);
  };

  const handleAddReviewSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        "/review/create",
        {
          tripId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      toast.success("Review added successfully!");
      setShowReviewModal(false);
      setRating("");
      setComment("");
    } catch (error) {
      toast.error("Error adding review.");
      console.error("Error adding review:", error);
    }
  };

  const handleBookNow = () => {
    if (!auth.user) {
      toast.error("You need to be logged in to book a trip.");
      return;
    }
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        "/booking/create",
        {
          tripId,
          travelerId: auth.user._id,
          bookingDate: currentDate,
          travelerDetails: { travelerDetails },
          totalTravelers,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      toast.success("Booking successful!");
      setShowBookingModal(false);
      setTravelerDetails({
        phone: "",
        age: "",
        gender: "",
        emergencyContact: { name: "", phone: "" },
      });
    } catch (error) {
      toast.error("Error booking trip.");
      console.error("Error booking trip:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTravelerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setTravelerDetails((prevDetails) => ({
      ...prevDetails,
      emergencyContact: {
        ...prevDetails.emergencyContact,
        [name]: value,
      },
    }));
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // if (!tripDetails) {
  //   return null; // Or return a message indicating no data
  // }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  const renderMap = () => {
    const zoomLevel = 6;
    const center =
      tripDetails.itinerary.length > 0
        ? {
            lat: tripDetails.itinerary[0].latitude,
            lng: tripDetails.itinerary[0].longitude,
          }
        : { lat: 0, lng: 0 };

    const pathCoordinates = tripDetails.itinerary.map((step) => ({
      lat: step.latitude,
      lng: step.longitude,
    }));

    console.log(pathCoordinates);

    return (
      // <LoadScript googleMapsApiKey="AIzaSyCn2ETkQeDAUWWne2Du0kn5iQ-AALFxH3M">
      <LoadScript googleMapsApiKey="AIzaSyDk-FWf87-PJj8C7FI5Hrg8Z24ZJfdGO-Y">
        <GoogleMap
          key={JSON.stringify(pathCoordinates)}
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={center}
          zoom={zoomLevel}
        >
          {pathCoordinates.length > 0 ? (
            <>
              <Polyline
                path={pathCoordinates}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  visible: true,
                }}
              />
              <Marker position={pathCoordinates[0]} />
              <Marker position={pathCoordinates[pathCoordinates.length - 1]} />
            </>
          ) : (
            <p>No itinerary data available</p>
          )}
        </GoogleMap>
      </LoadScript>
    );
  };

  return (
    <Container minWidth="100%" maxWidth="lg" disableGutters>
      {tripId && tripDetails && tripDetails.images && (
        <Box
          flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={{ xs: 4, md: 2 }}
        >
          <Box backgroundColor="black" mt={{ xs: 4 }}>
            {/* <ImageCarousel images={imagesObj} /> */}
            <ImageCarousel images={tripDetails.images} />
          </Box>
          <Grid container py={4} spacing={4}>
            <Grid item xs={12} md={9}>
              <Stack direction="column" width="100%">
                <Box flex direction="column" width="100%">
                  <Box flex direction="column">
                    {/* <Typography variant="h3">Polo Forest Trekking Camp</Typography> */}
                    <Typography variant="h3">{tripDetails.title}</Typography>
                    <Typography variant="subtitle1" ml={1}>
                      {tripDetails.source} {" to "} {tripDetails.destination}
                    </Typography>
                  </Box>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 1 }}
                    // flex
                    // direction="row"
                    sx={{ minWidth: "100%" }}
                    maxWidth="50%"
                    flexGrow={1}
                    pt={4}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid
                      item
                      // direction="row"
                      // justifyContent="center"
                      // alignItems="center"
                      xs={6}
                      md={3}
                      // mr={2}
                      // width="100%"
                    >
                      <CalendarMonthIcon />
                      <Box flex direction="column">
                        <Typography variant="body1">Duration</Typography>
                        <Typography variant="body2">
                          2 days / 1 night
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={3}
                      // direction="row"
                      // justifyContent="center"
                      // alignItems="center"
                      // mr={2}
                      // width="100%"
                    >
                      <FitnessCenterIcon />
                      <Box flex direction="column">
                        <Typography variant="body1">Difficulty</Typography>
                        <Typography variant="body2">Easy</Typography>
                        {/* <Typography variant="body2">{difficulty}</Typography> */}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={3}
                      // direction="row"
                      // justifyContent="center"
                      // alignItems="center"
                      // mr={2}
                      // width="100%"
                    >
                      <PeopleIcon />
                      <Box flex direction="column">
                        <Typography variant="body1">Age Group</Typography>
                        <Typography variant="body2">6-35 years</Typography>
                        {/* <Typography variant="body2">{ageGroup}</Typography> */}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      // direction="row"
                      // justifyContent="center"
                      // alignItems="center"
                      // mr={2}
                      // width="100%"
                      xs={6}
                      md={3}
                    >
                      <FilterHdrIcon />
                      <Box flex direction="column">
                        <Typography variant="body1">Max Altitude</Typography>
                        <Typography variant="body2">600 ft</Typography>
                        {/* <Typography variant="body2">{maxAltitude}</Typography> */}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Stack direction="column" mt={4}>
                  <Typography variant="subtitle1">About</Typography>
                  <Typography variant="body2">
                    The Polo Forest area was a part of a vast territory and
                    Vijaynagar was the capital 600 years back. The ancient city
                    was a pilgrimage for the Jains and Shivadharmi people of the
                    area. The jungle have 4 sculptured gates made of local
                    sedimentary rocks in each direction. Development of the city
                    was done along the river banks of Harnav. The temples were
                    destroyed by the Mughals and now are the heritage sites. The
                    jungles are rich with many wild animals like leopards and
                    bears.
                  </Typography>
                </Stack>
                <Stack>
                  <Box flex direction="column" mt={4}>
                    <Typography variant="h5">Route Map</Typography>
                    {tripDetails &&
                      tripDetails.itinerary &&
                      tripDetails.itinerary.length !== 0 &&
                      renderMap()}
                  </Box>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3} mt={{ xs: 4, md: 0 }}>
              <Stack
                direction="column"
                boxShadow={2}
                borderRadius={2}
                p={2}
                // mt={2}
              >
                <Stack direction="row" justifyContent="">
                  <Typography variant="h4">₹{tripDetails.price}</Typography>
                  <Typography variant="subtitle1">/person</Typography>
                </Stack>

                <Typography variant="subtitle1" mt={2}>
                  Includes
                </Typography>
                <Grid container mb={2} spacing={1}>
                  {Object.keys(tripDetails.amenities).map((key) => {
                    if (amenityMap[key]) {
                      const { icon, label } = amenityMap[key] || {};
                      return (
                        <Grid item xs={6} key={key}>
                          <Stack direction="row" alignItems="center">
                            {icon}
                            <Typography ml={1} variant="body2">
                              {label}
                            </Typography>
                          </Stack>
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </Stack>
              <Stack mt={{ xs: 4, md: 4 }}>
                <Typography variant="h4" mb={2}>
                  Itinerary
                </Typography>
                {tripDetails.itinerary && (
                  <>
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {tripDetails.itinerary.map((step, index) => (
                        <Step key={step.visitDate}>
                          <StepLabel>{step.visitDate.slice(0, 10)}</StepLabel>
                          <StepContent>
                            <Typography variant="h5">
                              {step.locationName}
                            </Typography>
                            <Typography variant="body2">
                              {step.description}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                              <div>
                                <Button
                                  variant="contained"
                                  onClick={handleNext}
                                  sx={{ mt: 1, mr: 1 }}
                                >
                                  {index === tripDetails.itinerary.length - 1
                                    ? "Finish"
                                    : "Continue"}
                                </Button>
                                <Button
                                  disabled={index === 0}
                                  onClick={handleBack}
                                  sx={{ mt: 1, mr: 1 }}
                                >
                                  Back
                                </Button>
                              </div>
                            </Box>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                    {activeStep === tripDetails.itinerary.length && (
                      <Paper square elevation={0} sx={{ p: 3 }}>
                        {/* <Typography>All steps completed - you&apos;re finished</Typography> */}
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                          Reset
                        </Button>
                      </Paper>
                    )}
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6} minHeight={{ xs: "40vh" }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="between"
                flexGrow={1}
              >
                <Typography variant="h4">Reviews</Typography>
                <Box ml={{ xs: 0, md: 4 }} mt={{ xs: 2, md: 0 }}>
                  <Button
                    sx={{ width: "140px" }}
                    variant="contained"
                    onClick={handleAddReview}
                  >
                    Add a Review
                  </Button>
                </Box>
              </Stack>
              <Box flex flexDirection="column" py={4}>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Box
                      key={review._id}
                      mb={2}
                      p={2}
                      border={1}
                      borderRadius={2}
                      borderColor="grey.300"
                      boxShadow={1}
                    >
                      <Typography variant="body1">{review.comment}</Typography>
                      <Rating value={review.rating} readOnly />
                      <Typography variant="body2">
                        By: {review.userId.firstName} {review.userId.lastName}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No reviews yet.</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
          {/* Add review modal */}
          <Modal
            open={showReviewModal}
            onClose={() => setShowReviewModal(false)}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
              p={4}
              bgcolor="white"
              borderRadius={2}
              boxShadow={24}
              width={{ xs: 300, sm: 400 }}
            >
              <Typography variant="h6" mb={2}>
                Add a Review
              </Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                max={5}
                mb={2}
              />
              <TextField
                label="Comment"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <Button variant="contained" onClick={handleAddReviewSubmit}>
                Submit
              </Button>
            </Box>
          </Modal>

          {/* Booking Modal */}
          <Modal
            open={showBookingModal}
            onClose={() => setShowBookingModal(false)}
          >
            <Box
              display="flex"
              flexDirection="column"
              p={4}
              bgcolor="background.paper"
              boxShadow={24}
              borderRadius={2}
              width="50%"
              mx="auto"
              my={4}
            >
              <Typography variant="h6" mb={2}>
                Book Trip
              </Typography>

              <TextField
                label="Phone Number"
                name="phone"
                value={travelerDetails.phone}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <TextField
                label="Age"
                name="age"
                value={travelerDetails.age}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={travelerDetails.gender}
                  onChange={handleInputChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Emergency Contact Name"
                name="name"
                value={travelerDetails.emergencyContact.name}
                onChange={handleEmergencyContactChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <TextField
                label="Emergency Contact Phone"
                name="phone"
                value={travelerDetails.emergencyContact.phone}
                onChange={handleEmergencyContactChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Total Number of Travelers"
                name="totalTravelers"
                type="number"
                value={totalTravelers}
                onChange={(e) => {
                  setTotalTravelers(e.target.value);
                }}
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <Button
                variant="contained"
                onClick={handleBookingSubmit}
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Modal>
        </Box>
      )}
    </Container>
  );
};

export default TripDetail;
