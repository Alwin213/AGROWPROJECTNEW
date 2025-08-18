import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [propertySubmissions, setPropertySubmissions] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("property");

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("submittedProperties")) || [];
    const storedContacts = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
    setPropertySubmissions(storedProperties);
    setContactSubmissions(storedContacts);
  }, []);

  const handleSendToDashboard = (property) => {
    const existing = JSON.parse(localStorage.getItem("dashboardProperties")) || [];

    // Avoid duplicates
    const isAlreadyAdded = existing.some(
      (p) => p.submittedAt === property.submittedAt && p.name === property.name
    );

    if (!isAlreadyAdded) {
      const updated = [...existing, property];
      localStorage.setItem("dashboardProperties", JSON.stringify(updated));
      alert("Property sent to Dashboard!");
    } else {
      alert("This property is already in the Dashboard.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("property")}
            className={`px-4 py-2 rounded ${
              activeTab === "property"
                ? "bg-purple-700 text-white"
                : "bg-white text-purple-700 border border-purple-700"
            }`}
          >
            Property Submissions
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-2 rounded ${
              activeTab === "contact"
                ? "bg-blue-700 text-white"
                : "bg-white text-blue-700 border border-blue-700"
            }`}
          >
            Contact Form Submissions
          </button>
        </div>

        {/* ---------------- Property Submissions ---------------- */}
        {activeTab === "property" && (
          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Submitted Properties</h2>

            {propertySubmissions.length === 0 ? (
              <p className="text-gray-500">No property submissions found.</p>
            ) : (
              propertySubmissions.map((property, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center border rounded-lg shadow p-4 mb-6 bg-white"
                >
                  {/* Left - Text Details */}
                  <div className="flex-1 pr-6 w-full">
                    <h3 className="text-xl font-semibold text-purple-600 mb-2">
                      {property.name}
                    </h3>
                    <p><strong>Property Type:</strong> {property.propertyType}</p>
                    <p><strong>Purpose:</strong> {property.purpose}</p>
                    <p><strong>Location:</strong> {property.location}</p>
                    <p><strong>Price:</strong> {property.price}</p>
                    <p><strong>Area:</strong> {property.area} sq.ft</p>
                    <p><strong>Contact:</strong> {property.contact}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Submitted At:</strong> {new Date(property.submittedAt).toLocaleString()}
                    </p>

                    {/* Send to Dashboard Button */}
                    <button
                      onClick={() => handleSendToDashboard(property)}
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Send to Farmer
                    </button>
                  </div>

                  {/* Right - Image Preview */}
                  <div className="w-full md:w-64 mt-4 md:mt-0">
                    {property.photos && property.photos.length > 0 ? (
                      <img
                        src={property.photos[0]}
                        alt="Property"
                        className="w-full h-40 object-cover rounded"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm italic text-center border rounded p-4">
                        No image uploaded
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* ---------------- Contact Submissions ---------------- */}
        {activeTab === "contact" && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Contact Form Submissions</h2>

            {contactSubmissions.length === 0 ? (
              <p className="text-gray-500">No contact form submissions found.</p>
            ) : (
              contactSubmissions.map((contact, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center border rounded-lg shadow p-4 mb-6 bg-white"
                >
                  <div className="flex-1 pr-6 w-full">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                      {contact.name}
                    </h3>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Area:</strong> {contact.area}</p>
                    <p><strong>Property Type:</strong> {contact.propertyType}</p>
                    <p><strong>Description:</strong> {contact.description}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Submitted At:</strong> {new Date(contact.submittedAt).toLocaleString()}
                    </p>
                  </div>

                  
                
                </div>
              ))
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
