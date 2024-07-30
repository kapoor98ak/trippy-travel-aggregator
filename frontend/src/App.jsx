import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Box } from "@mui/material";
import Spinner from "./components/Spinner.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
// import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing.jsx";
import FAQ from "./pages/FAQ.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import AddTripPage from "./pages/AddTrip.jsx";
import TripDetail from "./pages/TripDetail.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Trips from "./pages/Trips.jsx";
import AdminDashboard from "./components/Dashboards/AdminDashboard.jsx";
import EditTripPage from "./pages/EditTrip.jsx";
import TravelAgentDashboard from "./pages/TravelAgentDashboard.jsx";
// const Landing = lazy(() => import("./pages/Landing.jsx"));
// const FAQ = lazy(() => import("./pages/FAQ.jsx"));
// const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
// const Login = lazy(() => import("./pages/Login.jsx"));
// const Register = lazy(() => import("./pages/Register.jsx"));
// const ForgotPassword = lazy(() => import("./components/ForgotPassword.jsx"));
// const PasswordReset = lazy(() => import("./components/PasswordReset.jsx"));
// const AddTripPage = lazy(() => import("./pages/AddTrip.jsx"));
// const TripDetail = lazy(() => import("./pages/TripDetail.jsx"));
// const UserProfile = lazy(() => import("./pages/UserProfile.jsx"));
// const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
// const EditTripPage= lazy(() => import('./pages/EditTrip.jsx'));
// const TrailAgentDashboard= lazy(() => import('./pages/TrailAgentDashboard.jsx'));
// const Spinner=lazy(() => import('./components/Spinner.jsx'));

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
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<PasswordReset />} />
                  <Route path="/admin-home" element={<AdminDashboard />} />
                  <Route
                    path="/agent-dashboard"
                    element={<TravelAgentDashboard />}
                  />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/*  */}

                  {/* Trip Routes */}
                  <Route path="/trip/:tripId" element={<TripDetail />} />
                  <Route path="/trips" element={<Trips />} />
                  <Route path="/edittrip/:id" element={<EditTripPage />} />
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
