import {
    Accordion,
    AccordionActions,
    AccordionDetails, AccordionSummary,
    Box, Button,
    Container,
    Grid,
    Stack,
    styled,
    Typography

} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  return (
      <Container minHeight="100vh" minWidth="100vw" maxWidth="100vw">
          <Grid
              container
              spacing={4}
              minHeight={{ xs: "100vh", sm: "90vh" , md:"40vh"}}
              width="100%"
              mt={2}
          >
              <Grid
                  item
                  md={8}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
              >

                      <Typography variant="h3">
                        Frequently Asked Questions
                    </Typography>
                      <Typography variant={"subtitle1"} mt={1}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                      </Typography>
              </Grid>
              <Grid
                  item
                  sm={8}
                  md={4}
                  sx={{ display: "flex-inline", padding: 0 }}
                  mt={1}
              >
                  <Box
                      component="img"
                      alt="Frequently asked questions"
                      src="https://www.shutterstock.com/image-photo/sweet-smart-pug-puppy-dog-600nw-599090141.jpg"
                      sx={{ width: "100%" }}
                      borderRadius={4}

                  />
              </Grid>
          </Grid>
          <Grid

              minHeight={{ xs: "100vh", sm: "80vh" ,md: "70vh"}}
              width="100%"

          >
                  <Typography variant="h5" >
                      Planning to book a trip or post an Intenary.
                  </Typography>

              <Accordion >
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                  >
                      Q1: How do I create an account?
                  </AccordionSummary>
                  <AccordionDetails>
                      Our website offers a comprehensive range of travel services including flight bookings, hotel reservations, car rentals, and tour packages.
                      Additionally, travel agents can post itineraries and travel plans, making it easier for you to find and book your perfect trip.
                  </AccordionDetails>
              </Accordion>
              <Accordion>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                  >
                      Q2: What services does our travel website offer?
                  </AccordionSummary>
                  <AccordionDetails>
                      To create an account, click on the 'Sign Up' button on the top right corner of
                      our homepage. Fill in the required details such as your name, email address, and password.
                      You will receive a confirmation email to verify your account.
                  </AccordionDetails>
              </Accordion>
              <Accordion>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                  >
                      Q3: How can I make a booking?
                  </AccordionSummary>
                  <AccordionDetails>
                      To make a booking, simply search for your desired flight, hotel, or car rental using our search bar.
                      Select the option that best suits your needs and follow the on-screen instructions to complete your booking.
                      You can pay using various secure payment methods available on our site.
                  </AccordionDetails>
              </Accordion>

              <Accordion >
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                  >
                      Q4: Can I cancel or modify my booking?
                  </AccordionSummary>
                  <AccordionDetails>
                      Yes, you can cancel or modify your booking through your account dashboard.
                      Go to 'My Bookings', select the booking you wish to change or cancel, and follow the prompts.
                      Please note that cancellation and modification policies vary by service provider and may include fees
                  </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3-content"
                      id="panel3-header"
                  >
                      Q5: How can travel agents post itineraries?
                  </AccordionSummary>
                  <AccordionDetails>
                      Travel agents can post itineraries by signing up for a travel agent account.
                      Once registered, log in and go to the 'Post Itinerary' section. Fill in the details of your itinerary including destinations, activities, and pricing. Submit the itinerary for approval.
                      Once approved, it will be visible to all users.
                  </AccordionDetails>
                  <AccordionActions>
                      <Button>Cancel</Button>
                      <Button>Agree</Button>
                  </AccordionActions>
              </Accordion>

          </Grid>
      </Container>


  );
};

export default FAQ;
