import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/Axios";
import AgentProfile from "../components/Profiles/AgentProfile";
import TravelerProfile from "../components/Profiles/TravelerProfile";

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUser(auth.user);
    // console.log(user);
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!auth.token) {
    return <div>Error: User not authenticated</div>;
  }

  if (user && user.role === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      {user ? (
        user.role === "agent" ? (
          <AgentProfile user={user} />
        ) : (
          <TravelerProfile user={user} />
        )
      ) : (
        <div>Error: User data not available</div>
      )}
    </div>
  );
};

export default UserProfile;
