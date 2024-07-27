import React, { Suspense,lazy} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
const Landing = lazy(() => import('./pages/Landing.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));
const ContactUs = lazy(() => import('./pages/ContactUs.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword.jsx'));
const PasswordReset = lazy(() => import('./components/PasswordReset.jsx'));
const AddTripPage = lazy(() => import('./pages/AddTrip.jsx'));
import Spinner from './components/Spinner.jsx';



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
        <Box flex flexDirection="column" minheight="100vh" minwidth="100%">
          <Header />
          <Box flexGrow={1} minheight="100vh" minwidth="100%">
          <Suspense fallback={<Spinner />}>
          <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<PasswordReset />} />
                <Route path="/add-trip" element={<AddTripPage />} />
              </Routes>
            </Suspense>
          </Box>
          <Footer />
        </Box>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
