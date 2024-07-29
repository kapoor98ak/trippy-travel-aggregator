import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AgentDashboard from "../components/Dashboards/AgentDashboard";
import TravelerDashboard from "../components/Dashboards/TravelerDashboard";
import AdminDashboard from "../components/Dashboards/AdminDashboard";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);

  if (!auth.token) {
    return <div>Error: User not authenticated</div>;
  }

  const { user } = auth;
  const { role } = user || {};

  return (
    <div>
      {role === "agent" && <AgentDashboard />}
      {role === "traveler" && <TravelerDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
