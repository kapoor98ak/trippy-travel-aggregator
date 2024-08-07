import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/Axios.jsx";
import { Container, Grid, Typography, Button, Box, Paper, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TripCard from "../TripCard.jsx";
import TripSchedulerModal from "../TripSchedulerModal.jsx";
import { styled } from "@mui/system";
import { BarChart, PieChart } from "@mui/x-charts";

const getTripSummaryURL = "/trips/agent/trips-summary"
const getTotalBookingCountURL = "/trips/agent/bookings-sumary"
const getMonthWiseBookingForYearURL = "/trips/agent/bookings-sumary"//:year
const getReviewDataURL = "/trips/agent/review-summary"
const getAvgTripCostURL = "/trips/agent/average-trip-cost"
const getYearsListURL = "/admin/getUniqueYearsFromUsers";


const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  // For graphical dashboard  ===========================
  const [selectedYear, setSelectedYear] = useState(2024)
  const [yearsList, setYearsList] = useState([]);


  const [totalTripCount, setTotalTripCount] = useState(0)
  const [cancelledTripCount, setCancelledTripsCount] = useState(0)
  const [totalBookingCount, setTotalBookingCount] = useState(0)
  const [avgTripCost, setAvgTripCost] = useState(0);
  const [monthwiseBookingForYear, setMonthWiseBookingForYear] = useState([])
  const [reviewsData, setReviewsData] = useState([])

  //=====================================================
  useEffect(() => {
    GetYearsList();

    fetchBookingSummaryByYear()
    fetchTrips();
    fetchTripSummary()
    fetchBookingSummary()
    fetchAvgTripCost()
    fetchReviewSummary()
  }, []);

  useEffect(() => {
    fetchBookingSummaryByYear()
  }, [selectedYear]);

  async function GetYearsList() {
    const response = await axiosInstance.get(
      `${getYearsListURL}`
    );
    setYearsList(response.data);
  }

  async function handleSelectedYearChange(event) {
    setSelectedYear(event.target.value);
  }

  const fetchTripSummary = async () => {
    try {
      const response = await axiosInstance.get(getTripSummaryURL, getAuthTokenHeaderObject())
      setTotalTripCount(response.data.totalTrips)
      setCancelledTripsCount(response.data.canceledTrips)
    } catch (error) {
      console.log(`Unable to fetch trip summary. Error: ${error}`)
    }
  }

  const fetchBookingSummary = async () => {
    try {
      const response = await axiosInstance.get(getTotalBookingCountURL, getAuthTokenHeaderObject())
      setTotalBookingCount(response.data.totalBookings)
    } catch (error) {
      console.log(`Unable to fetch booking summary. Error: ${error}`)
    }
  }

  const fetchAvgTripCost = async () => {
    try {
      const response = await axiosInstance.get(getAvgTripCostURL, getAuthTokenHeaderObject())
      setAvgTripCost(response.data.averageCost)
    } catch (error) {
      console.log(`Unable to fetch avg cost. Error: ${error}`)
    }
  }

  const fetchBookingSummaryByYear = async () => {
    try {
      const response = await axiosInstance.get(`${getMonthWiseBookingForYearURL}/${selectedYear}`, getAuthTokenHeaderObject())
      setMonthWiseBookingForYear(response.data)
    } catch (error) {
      console.log(`Unable to fetch booking summary by year. Error: ${error}`)
    }
  }

  const fetchReviewSummary = async () => {
    try {
      const response = await axiosInstance.get(getReviewDataURL, getAuthTokenHeaderObject())
      const reviewsDataForPiechart = response.data.reviewSummary.map((d, i) => ({ id: i, value: d.count, label: d.rating.toString() + " ☆" }));
      setReviewsData(reviewsDataForPiechart)

    } catch (error) {
      console.log(`Unable to fetch review summary by year. Error: ${error}`)
    }
  }

  const getAuthTokenHeaderObject = () => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }
  }

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/trips/agent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const trips = response.data.filter(
        (trip) => trip.status !== "canceled"
      );

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
  const handleButtonClick = () => {
    navigate("/display-requests");
  };

  return (
    <>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Dashboard
        </Typography>
        {/* Graph container */}
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} sm={6}>
              <Item>
                Total trips
                <Typography variant="h3" component="h3">{totalTripCount}</Typography>
              </Item>
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Item>
                Cancelled trips
                <Typography variant="h3" component="h3">{cancelledTripCount}</Typography>
              </Item>
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Item>
                Total bookings
                <Typography variant="h3" component="h3">{totalBookingCount}</Typography>
              </Item>
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Item>
                Average trip cost
                <Typography variant="h3" component="h3">{parseInt(avgTripCost.toString().split('.')[0], 10)} $</Typography>
              </Item>
            </Grid>
          </Grid>
          <Box sx={{ ml: 7, mt: 2 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedYear}
                label="Age"
                onChange={(handleSelectedYearChange)}
              >
                {
                  yearsList.map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2} sx={{ paddingBottom: '20px' }}>
            <Grid item xs={12} md={6} sm={12}>
              <Item>
                <Box sx={{ width: '100%', height: { xs: 300, md: 400 } }}>
                  <BarChart
                    dataset={monthwiseBookingForYear}
                    xAxis={[{
                      scaleType: 'band',
                      dataKey: 'month',

                    }]}
                    yAxis={[{
                      label: 'Bookings count'
                    }]}
                    series={[{
                      dataKey: 'count',
                      label: 'Bookings',
                      showLabel: true,
                    }]}
                  />
                </Box>
                <Typography variant="h5">{`Month wise booking - ${selectedYear}`}</Typography>
              </Item>
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <Item>
                <Box sx={{ width: '100%', height: { xs: 300, md: 400 } }}>
                  <PieChart sx={{ padding: '45px' }}
                    series={[
                      {
                        data: reviewsData,
                      }]
                    }
                  />
                </Box>
                <Typography variant="h5">Reviews</Typography>
              </Item>
            </Grid>
          </Grid>
        </Container>
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
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Travel Requests
          </Button>
          <TripSchedulerModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            tripId={selectedTripId}
          />
        </div>
      </Container>
    </>
  );
};

export default AgentDashboard;
