// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpLandlord from "./pages/SignUpLandlord";
import SignUpClient from "./pages/SignUpClient";
import ClientLogin from "./pages/ClientLogin";

import Dashboard from "./pages/DashBoard";
import AgroAgreement from "./Components/AgrowAgreementPage";
import LandlordDashboard from "./Components/LandlordDashboard";
import Notifications from "./pages/Notifications";

import Layout from "./pages/Layout";
import AdminDashBoard from "./pages/AdminDashBoard";
import LoginAdmin from "./pages/AdminLogin";
import SignUpAdmin from "./pages/AdminSignup";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup-landlord" element={<SignUpLandlord />} />
      <Route path="/signup-client" element={<SignUpClient />} />
      <Route path="/login-client" element={<ClientLogin />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/signup-admin" element={<SignUpAdmin />} />

      {/* Private Routes with Header and Sidebar */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="agreement" element={<AgroAgreement />} />
        <Route path="landlord" element={<LandlordDashboard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="admin-dashboard" element={<AdminDashBoard />} />
      </Route>
    </Routes>
  );
}

export default App;
