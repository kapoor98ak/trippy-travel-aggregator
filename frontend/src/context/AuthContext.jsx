import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/Axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setAuth((prevAuth) => ({ ...prevAuth, token: storedToken }));
        await fetchUserDetails(storedToken);
      } else {
        setLoading(false); // Set loading to false if no token found
      }
    };

    initializeAuth();
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axiosInstance.get("/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("fetchUserDetails", response.data);
      setAuth((prevAuth) => ({ ...prevAuth, user: response.data.user }));
    } catch (error) {
      console.error("Error fetching user details", error);
      toast.error("Failed to fetch user details");
      setAuth({ user: null, token: null });
      localStorage.removeItem("token");
    } finally {
      setLoading(false); // Set loading to false after fetching user details
    }
  };

  useEffect(() => {
    console.log("auth change: ", auth);
  }, [auth]);

  const login = async (email, password) => {
    try {
      setLoading(true); // Set loading to true when login starts
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      setAuth((prevAuth) => ({ ...prevAuth, token: token }));
      localStorage.setItem("token", token);
      await fetchUserDetails(token); // Fetch user details after login
      toast.success("Login Successful!");
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Login failed");
      setLoading(false); // Set loading to false if login fails
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
      setLoading(true); // Set loading to true when registration starts
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
      setAuth((prevAuth) => ({ ...prevAuth, token: token }));
      localStorage.setItem("token", token);
      await fetchUserDetails(token); // Fetch user details after registration
      toast.success("Registration Successful!");
    } catch (error) {
      console.error("Error signing up", error);
      toast.error("Registration failed");
      setLoading(false); // Set loading to false if registration fails
    }
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("token");
    toast.success("Logout Successful!");
  };

  return (
    <AuthContext.Provider value={{ auth, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
