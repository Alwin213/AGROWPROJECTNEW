import React, { useEffect, useState, useRef } from "react";
import ListingCard from "../Components/ListingCard";
import MapComponent from "../Components/MapComponent";
import ContactForm from "../pages/Contact ";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { UserCircle } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const [activeSection, setActiveSection] = useState("listings");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const popupRef = useRef();
  const refs = useRef([]);
  const [combinedData, setCombinedData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    try {
      const storedDetails = localStorage.getItem("clientDetails");
      if (storedDetails) {
        const parsed = JSON.parse(storedDetails);
        setProfile(Array.isArray(parsed) ? parsed[0] : parsed);
      } else {
        setProfile({
          name: "John Doe",
          email: "john@example.com",
        });
      }
    } catch (error) {
      console.error("Error parsing clientDetails:", error);
    }
  }, []);

  useEffect(() => {
    const localData =
      JSON.parse(localStorage.getItem("dashboardProperties")) || [];
    const normalizedLocalData = localData.map((item) => ({
      name: item.name,
      propertyType: item.propertyType,
      location: item.location,
      price: item.price,
      purpose: item.purpose,
      area: item.area || "N/A",
      photos: item.photos || ["/placeholder.jpg"], // fallback image
    }));

    const combined = [...normalizedLocalData];
    setCombinedData(combined);
  }, []);

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowProfilePopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [selectedIndices, setSelectedIndices] = useState([]); // array instead of single index

  const handleCardClick = (index) => {
    setSelectedIndices((prev) => {
      if (prev.includes(index)) {
        // If already selected, remove it
        return prev.filter((i) => i !== index);
      } else {
        // Add to selection
        return [...prev, index];
      }
    });
  };

  const handleMarkerClick = (item, index) => {
    refs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    // Select the marker if not already selected
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

  const renderSection = () => {
    if (activeSection !== "listings") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6"
        >
          <h2 className="text-xl font-semibold mb-4">{activeSection}</h2>
          <p className="text-gray-700">
            Content for {activeSection} will go here.
          </p>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 overflow-auto space-y-6"
      >
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Left: Listing Cards */}
          <div className="space-y-4 h-[calc(100vh-100px)] overflow-y-auto pr-2">
            {combinedData.map((item, index) => (
              <div key={index} ref={(el) => (refs.current[index] = el)}>
                <ListingCard
                  data={item}
                  isSelected={index === selectedIndex}
                  onClick={() => handleCardClick(index)}
                />
              </div>
            ))}
          </div>

          {/* Right: Map */}
          <div className="h-[calc(100vh-100px)]">
            <MapComponent
              selectedProperties={selectedIndices.map((i) => combinedData[i])}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Contact Us About a Property
          </h2>
          <ContactForm />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="relative z-1000">
          <div className="absolute top-4 right-6">
            <button
              onClick={() => setShowProfilePopup((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1 bg-white shadow rounded-md hover:bg-gray-100 transition"
            >
              <UserCircle className="w-6 h-6 text-gray-700" />
              <span className="font-medium text-gray-700">{profile.name}</span>
            </button>
            {showProfilePopup && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 absolute right-0 bg-white shadow-lg rounded-md p-4 w-64 z-[9999]"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2  ">
                  Profile Info
                </h3>
                <p className="text-sm">
                  <strong>Name:</strong> {profile.name}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {profile.email}
                </p>
              
              </motion.div>
            )}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 overflow-auto">{renderSection()}</div>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};

export default Dashboard;
