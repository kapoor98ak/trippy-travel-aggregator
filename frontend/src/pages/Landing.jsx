import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Stack,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  Alert,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DoneIcon from "@mui/icons-material/Done";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import SaveIcon from "@mui/icons-material/Save";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const Landing = () => {
  const navigate = useNavigate();
  const featuredTripsCards = [
    {
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
      title: "Machu Picchu Trek",
      content:
        "Embark on a 4-day trek through the iconic Inca citadel of Machu Picchu",
    },
    {
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Northern Lights Adventure",
      content:
        "Witness the mesmerizing Aurora Borealis in the heart of Lapland, Finland",
    },
    {
      image:
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Bali Wellness Retreat",
      content:
        "Rejuvenate your mind, body, and soul at a luxury wellness retreat in Bali",
    },
  ];

  const partnerLogos = [
    {
      img: "https://github.com/mui/material-ui/assets/48391286/1bdf707a-385e-49e4-b56e-7049a2e73046",
    },
    {
      img: "https://github.com/mui/material-ui/assets/48391286/f6e97bb1-bc06-4126-85ae-347f671519dc",
    },
    {
      img: "https://github.com/mui/material-ui/assets/48391286/f1373cce-14d9-4438-97fe-aa517ae60b4a",
    },
    {
      img: "https://github.com/mui/material-ui/assets/48391286/ca75e41f-bbae-4de3-9ebe-d8800fd8dc18",
    },
    {
      img: "https://github.com/mui/material-ui/assets/48391286/798f38fb-adf5-443b-8071-ca351db95158",
    },
    {
      img: "https://github.com/mui/material-ui/assets/48391286/a2f3d489-726e-4d33-b134-a9954ef71b1b",
    },
    {
      img: "https://github.com/mui/material-ui/assets/48391286/56654980-e9d9-4538-8b09-3d3ed96c6e50",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setUserEmailError("");
  }, [userEmail]);

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!userEmail.trim()) {
      setUserEmailError("Please enter your email address");
      isValid = false;
    } else if (!emailRegex.test(userEmail)) {
      setUserEmailError("Please enter a valid email address");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setSuccessMsg("Submitted Successfully");
      setIsLoading(true);
      // Implement register logic
      setIsLoading(false);
    }
  };

  return (
    <Container minHeight="100vh" minWidth="100%" maxWidth="100%" disableGutters>
      <Grid
        container
        minHeight={{ xs: "100vh" }}
        height="100%"
        width="100%"
        bgcolor="#e1f5fe"
        px={4}
        py={{ xs: 6, sm: 2 }}
      >
        <Grid
          item
          sm={12}
          md={6}
          justifyContent="center"
          alignItems="center"
          sx={{ display: "flex", pl: 0 }}
        >
          <Box
            flex
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h1">
                Unlock the World's Most Incredible Trips
              </Typography>
              <Typography variant="subtitle1" mt={1}>
                Search and book trips from top travel agents in one place.
                Discover unique, curated experiences tailored to your
                preferences.
              </Typography>
            </Box>
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              width="100%"
              mt={2}
              // spacing={2}
            >
              <Grid item my={{ xs: 2, sm: 0 }}>
                <Button
                  onClick={() => {
                    navigate("/trips");
                  }}
                  variant="contained"
                >
                  Book a Trip
                </Button>
              </Grid>
              {/* <Grid item ml={{ xs: 0, sm: 2 }} my={{ xs: 2, sm: 0 }}>
              <Button variant="outlined">Explore Experiences</Button>
            </Grid> */}
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          sx={{ display: "flex", padding: 0 }}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="img"
            alt=""
            src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{ width: "100%" }}
            borderRadius={4}
            // sx={{
            //   height: 233,
            //   width: 350,
            //   maxHeight: { xs: 233, md: 167 },
            //   maxWidth: { xs: 350, md: 250 },
            // }}
          />
        </Grid>
      </Grid>
      <Stack
        direction="column"
        minHeight={{ xs: "100vh", sm: "80vh" }}
        height="100%"
        justifyContent="center"
        alignItems="center"
        // mt={{ xs: 10, sm: 5 }}
        // bgcolor="#e0e0e0"
        px={{ xs: 4 }}
        py={6}
      >
        <Box
          flex
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            flex
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Typography variant="body1">Featured Trips</Typography>
          </Box>
          <Box textAlign={{ xs: "left", md: "center" }}>
            <Typography variant="h1">Discover Incredible Trips</Typography>
          </Box>

          <Typography variant="subtitle1" mt={1}>
            Explore a curated selection of the world's most incredible trips,
            handpicked by our travel experts.
          </Typography>
        </Box>
        <Grid
          container
          mt={4}
          spacing={4}
          width={{ xs: "100%", sm: "90%" }}
          height={{ xs: "100%" }}
          justifyContent="center"
        >
          {featuredTripsCards.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              maxWidth={{ xs: 350, sm: 300 }}
              key={index}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  sx={{ height: 180 }}
                  image={card.image}
                  title="machu pichu"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained">
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {/* <Grid item xs={12} md={4} maxWidth={{ xs: 350, sm: 300 }}>
            <Card>
              <CardMedia
                sx={{ height: 180 }}
                image=""
                title="northern lights"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} maxWidth={{ xs: 350, sm: 300 }}>
            <Card>
              <CardMedia
                sx={{ height: 180 }}
                image=""
                title="bali"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained">
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid> */}
        </Grid>
      </Stack>
      <Stack
        direction="column"
        minHeight="70vh"
        height="100%"
        justifyContent="center"
        alignItems="center"
        px={{ xs: 4 }}
        textAlign="center"
        bgcolor="#f6f6f6"
      >
        <Typography variant="h3">Stay Up-to-Date with Trippy</Typography>
        <Typography variant="subtitle1" mt={4}>
          Sign up to receive exclusive offers, personalized trip
          recommendations, and the latest news from Trippy.
        </Typography>
        <Stack
          direction="column"
          // width={{ xs: "80%", md: "350px" }}
          justifyContent="center"
          alignItems="center"
          mt={4}
          component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          <Box flex justifyContent="center" justifyItems="center" width="100%">
            <TextField
              id="email"
              label="Email Address"
              name="email"
              variant="outlined"
              sx={{ width: 350 }}
              size="small"
              margin="normal"
              required
              fullWidth
              autoComplete="email"
              error={!!userEmailError}
              helperText={userEmailError}
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
            />
            {successMsg && (
              <Alert severity="success" sx={{ mt: 1 }}>
                {successMsg}
              </Alert>
            )}
          </Box>
          <Box flex justifyContent="center" justifyItems="center" mt={2}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              ml={{ sx: 0, md: 2 }}
              width={100}
            >
              Sign Up
            </Button>
          </Box>
        </Stack>
        <Typography variant="subtitle2" mt={1}>
          By signing up, you agree to our Terms &amp; Conditions
        </Typography>
      </Stack>
      <Grid
        container
        minHeight={{ xs: "100vh", md: "70vh" }}
        height="100%"
        justifyContent="center"
        alignItems="start"
        // bgcolor="#e0e0e0"
        px={4}
        py={8}
      >
        <Grid item xs={12} md={6}>
          <Stack direction="column">
            <Typography variant="subtitle2">Trusted by Travelers</Typography>
            <Typography variant="h3">What Our Customers Say</Typography>
          </Stack>
          <Stack direction="column" width="90%">
            <Stack
              direction="column"
              boxShadow={2}
              borderRadius={2}
              p={2}
              mt={2}
            >
              <Stack direction="row" justifyContent="start" alignItems="center">
                {/* <Avatar>J</Avatar> */}
                <Box
                  component="img"
                  src="https://github.com/mui/material-ui/assets/48391286/1c7b4c8f-7596-4115-a4ff-abc54c9bcf11"
                  sx={{ height: 50, width: 50 }}
                  borderRadius="50%"
                />
                <Stack direction="column" ml={2}>
                  <Typography variant="h6">Hugh Grant</Typography>
                  <Typography variant="subtitle2">Verified Traveler</Typography>
                </Stack>
              </Stack>
              <Box mt={1}>
                <Typography>
                  "Trippy made planning my dream trip to Machu Picchu a breeze.
                  The curated experiences and seamless booking process were a
                  game-changer."
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="column"
              boxShadow={2}
              borderRadius={2}
              p={2}
              mt={3}
            >
              <Stack direction="row" justifyContent="start" alignItems="center">
                <Box
                  component="img"
                  src="https://github.com/mui/material-ui/assets/48391286/a41d62da-6696-4ae7-a720-c05ab5e67cf8"
                  sx={{ height: 50, width: 50 }}
                  borderRadius="50%"
                />
                <Stack direction="column" ml={2}>
                  <Typography variant="h6">Cho Chan</Typography>
                  <Typography variant="subtitle2">Verified Traveler</Typography>
                </Stack>
              </Stack>
              <Box mt={1}>
                <Typography>
                  "I've used Trippy for my last three trips, and I'm always
                  impressed by the unique experiences and top-notch service.
                  Highly recommended!"
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} mt={{ xs: 6, sm: 0 }}>
          <Typography variant="subtitle2">Trusted Partners</Typography>
          <Grid
            container
            spacing={{ xs: 4, sm: 6 }}
            width="100%"
            mt={{ xs: 2, sm: 1 }}
          >
            {partnerLogos.map((partner, index) => (
              <Grid item xs={4} sm={3} key={index}>
                <Box
                  index={index}
                  component="img"
                  // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcD-pxOE0HXagEPOxHY1glbk7HY8DsEpwsgg&s"
                  src={partner.img}
                  sx={{ height: 80, width: 80 }}
                  borderRadius={4}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Stack
        direction="column"
        minHeight={{ xs: "100vh", sm: "70vh" }}
        height="100%"
        justifyContent="center"
        alignItems="center"
        mt={{ xs: 10, md: 5 }}
        mb={{ xs: 10, md: 5 }}
        px={4}
        py={{ xs: 8, sm: 2 }}
        bgcolor="#f6f6f6"
      >
        <Grid container spacing={{ xs: 8, md: 6 }}>
          <Grid item xs={12} md={6} lg={4}>
            <Stack direction="column">
              <SearchIcon sx={{ fontSize: 40, fontWeight: 1000 }} />
              <Typography variant="h4" mt={1}>
                Comprehensive Search
              </Typography>
              <Typography variant="subtitle2" mt={1}>
                Search through thousands of travel packages from top providers
                to find the perfect fit for your needs.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack direction="column">
              <CompareArrowsIcon sx={{ fontSize: 40, fontWeight: 1000 }} />
              <Typography variant="h4" mt={1}>
                Side-by-Side Comparison
              </Typography>
              <Typography variant="subtitle2" mt={1}>
                Compare trip packages, amenities, and prices to make an informed
                decision.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack direction="column">
              <DoneIcon sx={{ fontSize: 40, fontWeight: 1000 }} />
              <Typography variant="h4" mt={1}>
                Verified Reviews
              </Typography>
              <Typography variant="subtitle2" mt={1}>
                Read real reviews from other travelers to ensure you book the
                best experience.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack direction="column">
              <BookOnlineIcon sx={{ fontSize: 40, fontWeight: 1000 }} />
              <Typography variant="h4" mt={1}>
                Seamless Booking
              </Typography>
              <Typography variant="subtitle2" mt={1}>
                Book your entire trip package directly through our platform with
                ease.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack direction="column">
              <SaveIcon sx={{ fontSize: 40, fontWeight: 1000 }} />
              <Typography variant="h4" mt={1}>
                Unbeatable Savings
              </Typography>
              <Typography variant="subtitle2" mt={1}>
                Take advantage of exclusive deals and discounts to get the best
                value for your money.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack direction="column">
              <PowerSettingsNewIcon sx={{ fontSize: 40, fontWeight: 1000 }} />
              <Typography variant="h4" mt={1}>
                24/7 Customer Support
              </Typography>
              <Typography variant="subtitle2" mt={1}>
                Our dedicated team is available around the clock to assist you
                with any questions or concerns.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      {/* </Stack> */}
    </Container>
  );
};

export default Landing;
