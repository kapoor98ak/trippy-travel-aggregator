import React from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => () => {
    navigate(path);
  };

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
                <Button
                  onClick={handleNavigation("/")}
                  style={{ color: "#fff", textTransform: "none" }}
                >
                  Home
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleNavigation("/faq")}
                  style={{ color: "#fff", textTransform: "none" }}
                >
                  FAQ
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleNavigation("/contact")}
                  style={{ color: "#fff", textTransform: "none" }}
                >
                  Contact
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
