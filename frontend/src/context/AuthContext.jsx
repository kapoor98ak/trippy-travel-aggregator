import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/Axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const login = async (email, password) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    setAuth({ user: response.data.user, token: response.data.token });
    localStorage.setItem(
      "auth",
      JSON.stringify({ user: response.data.user, token: response.data.token })
    );
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
