import React from "react";
import { Container, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "16px 0",
        minHeight: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">
              © 2024 Trippy. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  About Us
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  Services
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit" underline="hover">
                  Contact
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
