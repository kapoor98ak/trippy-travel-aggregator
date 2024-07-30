import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AgentProfile from "../components/Profiles/AgentProfile";
import TravelerProfile from "../components/Profiles/TravelerProfile";

const UserProfile = () => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth.token) {
    return <div>Error: User not authenticated</div>;
  }

  if (auth && auth.user && auth.user.role === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      {auth.user ? (
        auth.user.role === "agent" ? (
          <AgentProfile user={auth.user} />
        ) : (
          <TravelerProfile user={auth.user} />
        )
      ) : (
        <div>Error: User data not available</div>
      )}
    </div>
  );
};

export default UserProfile;
