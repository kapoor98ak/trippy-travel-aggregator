import React from "react";
// import "./App.css";
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

function App() {
  return (
    <BrowserRouter>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/faq" element={<FAQ />} />
            <Route exact path="/contact" element={<ContactUs />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />
            {/* <Route
              exact
              path="/reset-password/:token"
              element={<PasswordReset />}
            /> */}
            <Route exact path="/reset-password" element={<PasswordReset />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
