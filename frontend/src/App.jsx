import React from "react";
// import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import FAQ from "./pages/FAQ.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
// import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "1.2rem",
    },
    components: {
      MuiContainer: {
        defaultProps: {
          disableGutters: true,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box flex flexDirection="column" minHeight="100vh" minWidth="100%">
          <Header />
          <Box flexGrow={1}>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/faq" element={<FAQ />} />
              <Route exact path="/contact" element={<ContactUs />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/forgotpassword"
                element={<ForgotPassword />}
              />
              {/* <Route
              exact
              path="/reset-password/:token"
              element={<PasswordReset />}
            /> */}
              <Route exact path="/reset-password" element={<PasswordReset />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
