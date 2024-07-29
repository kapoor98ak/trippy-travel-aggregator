import React from "react";
import { Navigate } from "react-router-dom";
import AgentProfile from "../components/Profiles/AgentProfile.jsx";
import TravelerProfile from "../components/Profiles/TravelerProfile.jsx";

const UserProfile = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  // if (!auth) {
  //   return <div>Error: User not authenticated</div>;
  // }

  // if (auth.user.role === "admin") {
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <div>
      {auth.user.role === "agent" ? <AgentProfile /> : <TravelerProfile />}
      <TravelerProfile />
    </div>
  );
};

export default UserProfile;
