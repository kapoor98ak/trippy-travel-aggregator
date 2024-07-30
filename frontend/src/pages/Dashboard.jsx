import React from "react";
import AgentDashboard from "../components/Dashboards/AgentDashboard";
import TravelerDashboard from "../components/Dashboards/TravelerDashboard";
import AdminDashboard from "../components/Dashboards/AdminDashboard";

const Dashboard = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth) {
    return <div>Error: User not authenticated</div>;
  }

  const { role } = auth.user;

  return (
    <div>
      {role === "agent" && <AgentDashboard />}
      {role === "traveler" && <TravelerDashboard />}
      {role === "admin" && <AdminDashboard />}
      <TravelerDashboard />
    </div>
  );
};

export default Dashboard;
