import {
  Container,
  Typography,
  Stack,
  Box,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DoneIcon from "@mui/icons-material/Done";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import SaveIcon from "@mui/icons-material/Save";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const Landing = () => {
  return (
    <Container minHeight="100vh" minWidth="100vw" maxWidth="100vw">
      <Grid
        container
        spacing={2}
        minHeight={{ xs: "100vh", sm: "90vh" }}
        width="100%"
      >
        <Grid
          item
          sm={12}
          md={6}
          direction="column"
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
            <Typography variant="h1">
              Unlock the World's Most Incredible Trips
            </Typography>
            <Typography variant="subtitle1" mt={1}>
              Search and book trips from top travel agents in one place.
              Discover unique, curated experiences tailored to your preferences.
            </Typography>
          </Box>
          <Box
            flex
            direction="row"
            justifyContent="start"
            alignItems="center"
            width="100%"
            mt={2}
          >
            <Button variant="contained">Book a Trip</Button>
            <Button variant="outlined" sx={{ ml: 2 }}>
              Explore Experiences
            </Button>
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
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
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
        width="100%"
        justifyContent="center"
        alignItems="center"
        mt={{ xs: 10, sm: 5 }}
      >
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography variant="body1" alignSelf="center">
            Featured Trips
          </Typography>
          <Typography variant="h1">Discover Incredible Trips</Typography>
          <Typography variant="subtitle1" mt={1}>
            Explore a curated selection of the world's most incredible trips,
            handpicked by our travel experts.
          </Typography>
        </Stack>
        <Grid
          container
          mt={4}
          spacing={4}
          width={{ xs: "100%", sm: "90%", md: "70%" }}
        >
          <Grid item xs={12} md={4}>
            <Box sx={{ borderRadius: 3, boxShadow: 2 }}>
              <Box
                component="img"
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                width="100%"
                borderRadius={3}
              />
              <Stack direction="column" p={2}>
                <Typography variant="h5">Machu Picchu Trek</Typography>
                <Typography variant="subtitle2">
                  Embark on a 4-day trek through the iconic Inca citadel of
                  Machu Picchu.
                </Typography>
                <Button variant="contained" sx={{ width: "50%", mt: 2 }}>
                  Book Now
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ borderRadius: 3, boxShadow: 2 }}>
              <Box
                component="img"
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                width="100%"
                borderRadius={3}
              />
              <Stack direction="column" p={2}>
                <Typography variant="h5">Northern Lights</Typography>
                <Typography variant="subtitle2">
                  Witness the mesmerizing Aurora Borealis in the heart of
                  Lapland, Finland.
                </Typography>
                <Button variant="contained" sx={{ width: "50%", mt: 2 }}>
                  Book Now
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ borderRadius: 3, boxShadow: 2 }}>
              <Box
                component="img"
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                width="100%"
                borderRadius={3}
              />
              <Stack direction="column" p={2}>
                <Typography variant="h5">Bali Wellness Retreat</Typography>
                <Typography variant="subtitle2">
                  Rejuvenate your mind, body, and soul at a luxury wellness
                  retreat in Bali.
                </Typography>
                <Button variant="contained" sx={{ width: "50%", mt: 2 }}>
                  Book Now
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Stack
        direction="column"
        minHeight="70vh"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3">Stay Up-to-Date with Trippy</Typography>
        <Typography variant="subtitle1" mt={1}>
          Sign up to receive exclusive offers, personalized trip
          recommendations, and the latest news from Trippy.
        </Typography>
        <Box
          flex
          direction={{ xs: "column", md: "column" }}
          width={{ xs: "80%", md: "350px" }}
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <Button variant="contained" ml={2}>
            Sign Up
          </Button>
        </Box>
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
                <Avatar>J</Avatar>
                <Stack direction="column" ml={2}>
                  <Typography variant="h6">John Doe</Typography>
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
                <Avatar>J</Avatar>
                <Stack direction="column" ml={2}>
                  <Typography variant="h6">Jane Smith</Typography>
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
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">Trusted Partners</Typography>
          <Grid container spacing={4} mt={1} width="100%">
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "text.disabled",
                  borderRadius: 2,
                  height: 80,
                  width: 80,
                }}
              ></Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "text.disabled",
                  borderRadius: 2,
                  height: 80,
                  width: 80,
                }}
              ></Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "text.disabled",
                  borderRadius: 2,
                  height: 80,
                  width: 80,
                }}
              ></Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "text.disabled",
                  borderRadius: 2,
                  height: 80,
                  width: 80,
                }}
              ></Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "text.disabled",
                  borderRadius: 2,
                  height: 80,
                  width: 80,
                }}
              ></Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Stack
        direction="column"
        minHeight={{ xs: "100vh", sm: "70vh" }}
        height="100%"
        justifyContent="start"
        alignItems="center"
        mt={{ xs: 10, md: 5 }}
        mb={{ xs: 10, md: 5 }}
      >
        <Grid container spacing={{ xs: 2, md: 6 }}>
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
