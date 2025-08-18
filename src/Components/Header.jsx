import React, { useState, useEffect, useRef } from "react";
import { UserCircle } from "lucide-react";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({});
  const dropdownRef = useRef();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
      <h1 className="text-xl font-bold text-gray-800">Agro Dashboard</h1>
      <div className="relative" ref={dropdownRef}>
          </div>
    </header>
  );
};

export default Header;
