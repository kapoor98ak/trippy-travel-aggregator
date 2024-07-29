import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/Axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  const fetchUserDetails = async (token) => {
    try {
      const response = await axiosInstance.get("/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setAuth((prevAuth) => ({ ...prevAuth, user: response.data.user }));
    } catch (error) {
      console.error("Error fetching user details", error);
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuth((prevAuth) => ({ ...prevAuth, token: storedToken }));
      fetchUserDetails(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      setAuth((prevAuth) => ({ ...prevAuth, token: response.data.token }));
      localStorage.setItem("token", token);
      toast.success("Login Successful!");
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Login failed");
    }
  };

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    role,
    agency_bin,
    agency_name,
    agency_address,
  }) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role,
        agency_bin,
        agency_name,
        agency_address,
      });
      const token = response.data.token;
      setAuth((prevAuth) => ({ ...prevAuth, token: response.data.token }));
      localStorage.setItem("token", token);
      toast.success("Registration Successful!");
    } catch (error) {
      console.error("Error signing up", error);
      toast.error("Registration failed");
    }
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("token");
    toast.success("Logout Successful!");
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
