import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  return (
    // <Box flex flexGrow={1}>
    <Container
      flex
      minWidth="100%"
      maxWidth="100%"
      justifyContent="center"
      justifyItems="center"
      disableGutters
    >
      <Grid
        container
        minHeight={{ xs: "100vh", sm: "90vh", md: "40vh" }}
        width="100%"
        mt={2}
        p={4}
      >
        <Grid
          item
          md={8}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Frequently Asked Questions</Typography>
          <Typography variant={"subtitle1"} mt={4}>
            Welcome to our FAQ section! Here, we aim to answer some of the most
            common questions you might have about our services. Whether you're
            planning your next vacation or looking to post a detailed itinerary,
            we've got you covered. Our team is dedicated to providing you with
            the best travel experience possible. If you can't find the answer
            you're looking for, feel free to contact our support team for
            further assistance. We're here to help you every step of the way to
            ensure your travel plans go smoothly.
          </Typography>
        </Grid>
        <Grid
          item
          sm={8}
          md={4}
          // sx={{ display: "flex-inline", padding: 0 }}
          mt={{ xs: 4, sm: 2 }}
          mx="auto"
        >
          <Box
            component="img"
            alt="Frequently asked questions"
            src="https://github.com/mui/material-ui/assets/48391286/17498e3b-c51f-4fd2-88ae-74b93d9053aa"
            sx={{ width: "100%" }}
            borderRadius={4}
          />
        </Grid>
      </Grid>
      <Box
        flex
        direction="column"
        justifyContent="center"
        justifyItems="center"
        height="100%"
        width={{ xs: "90%", sm: "70vw" }}
        m="auto"
        py={10}
      >
        <Typography variant="h4" mb={4}>
          Curious About Booking a Trip or Posting Travel Plans? Ask Away!
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ fontWeight: "bold" }}
          >
            How do I create an account?
          </AccordionSummary>
          <AccordionDetails>
            To create an account, click on the 'Sign Up' button on the top right
            corner of our homepage. Fill in the required details such as your
            name, email address, and password. You will receive a confirmation
            email to verify your account.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ fontWeight: "bold" }}
          >
            What services does our travel website offer?
          </AccordionSummary>
          <AccordionDetails>
            Our website offers a comprehensive range of travel services
            including flight bookings, hotel reservations, car rentals, and tour
            packages. Additionally, travel agents can post itineraries and
            travel plans, making it easier for you to find and book your perfect
            trip.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ fontWeight: "bold" }}
          >
            How can I make a booking?
          </AccordionSummary>
          <AccordionDetails>
            To make a booking, simply search for your desired flight, hotel, or
            car rental using our search bar. Select the option that best suits
            your needs and follow the on-screen instructions to complete your
            booking. You can pay using various secure payment methods available
            on our site.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ fontWeight: "bold" }}
          >
            Can I cancel or modify my booking?
          </AccordionSummary>
          <AccordionDetails>
            Yes, you can cancel or modify your booking through your account
            dashboard. Go to 'My Bookings', select the booking you wish to
            change or cancel, and follow the prompts. Please note that
            cancellation and modification policies vary by service provider and
            may include fees
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ fontWeight: "bold" }}
          >
            How can travel agents post itineraries?
          </AccordionSummary>
          <AccordionDetails>
            Travel agents can post itineraries by signing up for a travel agent
            account. Once registered, log in and go to the 'Post Itinerary'
            section. Fill in the details of your itinerary including
            destinations, activities, and pricing. Submit the itinerary for
            approval. Once approved, it will be visible to all users.
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
    // </Box>
  );
};

export default FAQ;
