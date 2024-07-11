import React, { useState, useEffect } from "react";
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
  Container,
  Typography,
  Stack,
  Box,
  Button,
  TextField,
  Card,
  Alert,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from "@mui/material";

const TripDetail = () => {
  const images = [
    "https://via.placeholder.com/600x400", // Replace with your image URLs
    "https://via.placeholder.com/600x400",
    "https://via.placeholder.com/600x400",
  ];
  const steps = [
    {
      label: "DAY 1 • JUL 13, 2024",
      title: `Departure & Sunrise Trek`,
      description: "Trek to Idar Garh & Visit Polo Forest",
    },
    {
      label: "DAY 2 • JUL 14, 2024",
      title: "Trekking & Adventure Activities at Idar",
      description: "Evening Returning to Ahmedabad",
    },
  ];
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
  return (
    <Container minWidth="100%" maxWidth="lg" disableGutters>
      <Box>
        <ImageCarousel images={images} />
      </Box>
      <Grid container py={4} spacing={2}>
        <Grid item xs={6} md={9}>
          <Stack direction="column" width="100%">
            <Box flex direction="column" width="100%">
              <Box flex direction="column">
                <Typography variant="h3">Polo Forest Trekking Camp</Typography>
                <Typography variant="subtitle1">
                  Polo Forest Trekking Camp
                </Typography>
              </Box>
              <Stack
                flex
                direction="row"
                minWidth="100%"
                width="100%"
                flexGrow={1}
                mt={2}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  mr={2}
                  // width="100%"
                >
                  <CalendarMonthIcon />
                  <Box flex direction="column" ml={1}>
                    <Typography variant="body1">Duration</Typography>
                    <Typography variant="body2">2 days / 1 night</Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  mr={2}
                  // width="100%"
                >
                  <FitnessCenterIcon />
                  <Box flex direction="column" ml={1}>
                    <Typography variant="body1">Difficulty</Typography>
                    <Typography variant="body2">Easy</Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  mr={2}
                  // width="100%"
                >
                  <PeopleIcon />
                  <Box flex direction="column" ml={1}>
                    <Typography variant="body1">Age Group</Typography>
                    <Typography variant="body2">6-35 years</Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  mr={2}
                  // width="100%"
                >
                  <FilterHdrIcon />
                  <Box flex direction="column" ml={1}>
                    <Typography variant="body1">Max Altitude</Typography>
                    <Typography variant="body2">600 ft</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
            <Stack direction="column" mt={4}>
              <Typography variant="subtitle1">About</Typography>
              <Typography variant="body2">
                The Polo Forest area was a part of a vast territory and
                Vijaynagar was the capital 600 years back. The ancient city was
                a pilgrimage for the Jains and Shivadharmi people of the area.
                The jungle have 4 sculptured gates made of local sedimentary
                rocks in each direction. Development of the city was done along
                the river banks of Harnav. The temples were destroyed by the
                Mughals and now are the heritage sites. The jungles are rich
                with many wild animals like leopards and bears. Spiders and
                pythons are also found in the dense jungle area. In tress, here
                are more than 600 types. Many species of water birds and crabs
                are also found in the river and reservoir. The area is sanctuary
                and being maintained by the Dholwani range forest department.
                The government has also established a campsite with a view to
                provide nature education and develop the site as tourism place.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stack direction="column" boxShadow={2} borderRadius={2} p={2} mt={2}>
            <Stack direction="row" justifyContent="">
              <Typography variant="h4">₹1,499</Typography>
              <Typography variant="subtitle1">/person</Typography>
            </Stack>

            <Typography variant="subtitle1" mt={2}>
              Includes
            </Typography>
            <Grid container mb={2} spacing={1}>
              <Grid item xs={6}>
                <Stack direction="row">
                  <LocalDiningIcon />
                  <Typography ml={1} variant="body2">
                    Food
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row">
                  <SingleBedIcon />
                  <Typography ml={1} variant="body2">
                    Stay
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row">
                  <SportsFootballIcon />
                  <Typography ml={1} variant="body2">
                    Activities
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row">
                  <MedicalServicesIcon />
                  <Typography ml={1} variant="body2">
                    First Aid
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row">
                  <DirectionsBusIcon />
                  <Typography ml={1} variant="body2">
                    Travelling
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row">
                  <PersonPinIcon />
                  <Typography ml={1} variant="body2">
                    Guide
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Button variant="contained">Book Now</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack pb={8} pt={2}>
        <Typography variant="h4" mb={4}>
          Itinerary
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography variant="h5">{step.title}</Typography>
                <Typography variant="body2">{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
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
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            {/* <Typography>All steps completed - you&apos;re finished</Typography> */}
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default TripDetail;
