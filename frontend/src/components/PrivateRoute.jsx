import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.token) {
      return;
    } else {
      navigate("/login");
    }
  }, []);

  return children;
};

export default PrivateRoute;
