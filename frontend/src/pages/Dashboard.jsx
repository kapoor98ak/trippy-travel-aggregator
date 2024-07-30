import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AgentDashboard from "../components/Dashboards/AgentDashboard";
import TravelerDashboard from "../components/Dashboards/TravelerDashboard";
import AdminDashboard from "../components/Dashboards/AdminDashboard";

const Dashboard = () => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (auth && auth.user) {
    switch (auth.user.role) {
      case "agent":
        return <AgentDashboard />;
      case "traveler":
        return <TravelerDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <div>Role not recognized</div>;
    }
  } else {
    return <div>User not authenticated</div>;
  }
};

export default Dashboard;
