// Sidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear localStorage or auth data
   
    navigate("/"); // Redirect to home or login page
  };

  return (
    <aside className="w-60 bg-green-200 p-5 min-h-screen flex flex-col justify-between">
      <nav className="space-y-4">
        <Link to="/dashboard" className="block font-bold text-xl mb-4">
          Dashboard
        </Link>
        <Link to="/dashboard/agreement" className="block font-semibold">
          Agro Agreement
        </Link>
        <Link to="/dashboard/notifications" className="block font-semibold">
          Notifications
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
