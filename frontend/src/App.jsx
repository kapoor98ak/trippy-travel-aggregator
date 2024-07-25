import React from "react";
// import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing.jsx";
import FAQ from "./pages/FAQ.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import TripDetail from "./pages/TripDetail.jsx";

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Box flex flexDirection="column" minHeight="100vh" minWidth="100%">
          <Header />
          <Box flexGrow={1} minHeight="100vh" minWidth="100%">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
              <Route path="/reset-password" element={<PasswordReset />} />
              <Route path="/tripdetail" element={<TripDetail />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
