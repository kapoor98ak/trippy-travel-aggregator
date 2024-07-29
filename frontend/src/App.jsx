import React, { Suspense,lazy} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { createMuiTheme} from "@material-ui/core";
const Landing = lazy(() => import('./pages/Landing.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));
const ContactUs = lazy(() => import('./pages/ContactUs.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword.jsx'));
const PasswordReset = lazy(() => import('./components/PasswordReset.jsx'));
const AddTripPage = lazy(() => import('./pages/AddTrip.jsx'));
const TripDetail = lazy(() => import('./pages/TripDetail.jsx'));
import Spinner from './components/Spinner.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute";
const UserProfile = lazy(() => import('./pages/UserProfile.jsx'));
const Dashboard= lazy(() => import('./pages/Dashboard.jsx'));


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
          {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          /> */}
          <Box flex flexDirection="column" minHeight="100vh" minWidth="100%">
            <Header />
            <Box flexGrow={1} minHeight="100vh" minWidth="100%">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/addtrip" element={<AddTripPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<PasswordReset />} />
                <Route path="/tripdetail" element={<TripDetail />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
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
