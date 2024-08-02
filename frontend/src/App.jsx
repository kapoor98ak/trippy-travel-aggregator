import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Box } from "@mui/material";

// Components
import Spinner from "./components/Spinner.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Landing from "./pages/Landing.jsx";
import FAQ from "./pages/FAQ.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import AddTripPage from "./pages/AddTrip.jsx";
import TripDetail from "./pages/TripDetail.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./components/Dashboards/AdminDashboard.jsx";
import EditTripPage from "./pages/EditTrip.jsx";
import AdminHomePage from "./pages/AdminHomePage.jsx";
import Trips from "./pages/Trips.jsx";
// AL Changes
import TravelRequestForm from "./pages/TravelRequestForm.jsx";
import DisplayRequests from "./pages/DisplayRequests.jsx";

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
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition="Bounce"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              minWidth: "100%",
            }}
          >
            <Header />

            <Box sx={{ flexGrow: 1, minHeight: "100vh", minWidth: "100%" }}>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  {/* Basic Application Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<ContactUs />} />
                  {/*  */}

                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/addtrip" element={<AddTripPage />} />
                  <Route path="/forgotpassword" element={<ForgotPassword />} />
                  <Route
                    path="/resetpassword/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="/admin-home" element={<AdminDashboard />} />
                  {/* <Route
                    path="/agent-dashboard"
                    element={<TravelAgentDashboard />}
                  /> */}
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/*  */}

                  {/* Trip Routes */}
                  <Route path="/trip/:tripId" element={<TripDetail />} />
                  <Route path="/edittrip/:id" element={<EditTripPage />} />

                  <Route path="/tripss" element={<Trips />} />
                  <Route path="/travel-request-form" element={<TravelRequestForm/>} />
                  <Route path="/display-requests" element={<DisplayRequests />} />

                  {/*  */}
                </Routes>
              </Suspense>
            </Box>
            <Footer />
          </Box>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
