import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LandlordDashboard = () => {
  const [landlord, setLandlord] = useState(null);
  const [form, setForm] = useState({
    name: "",
    propertyType: "",
    purpose: "",
    contact: "",
    location: "",
    price: "",
    area: "",
    photos: null,
    agreed: false,
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("landlordSignUp"));
    if (data) {
      setLandlord(data);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, photos: files }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agreed) {
      toast.error("You must agree to terms and conditions");
      return;
    }

    const convertToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    const base64Images = form.photos
      ? await Promise.all(Array.from(form.photos).map(convertToBase64))
      : [];

    const newEntry = {
      ...form,
      photos: base64Images,
      submittedAt: new Date().toISOString(),
    };

    const existing =
      JSON.parse(localStorage.getItem("submittedProperties")) || [];
    const updated = [...existing, newEntry];

    localStorage.setItem("submittedProperties", JSON.stringify(updated));

    toast.success("✅ Property submitted successfully!");

    // 🔹 Reset form after successful submission
    setForm({
      name: "",
      propertyType: "",
      purpose: "",
      contact: "",
      location: "",
      price: "",
      area: "",
      photos: null,
      agreed: false,
    });

    // Example: redirect after short delay if needed
    setTimeout(() => {
      // navigate("/somewhere");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Welcome, {landlord?.name || "Landlord"}!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block font-medium mb-1">Property Type</label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option>Building</option>
              <option>Open Plot</option>
              <option>Flat</option>
              <option>House</option>
              <option>Farmland</option>
              <option>Other</option>
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="block font-medium mb-1">Purpose</label>
            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option>Rent</option>
              <option>Lease</option>
              <option>Sale</option>
            </select>
          </div>

          {/* Contact */}
          <div>
            <label className="block font-medium mb-1">Contact Details</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="e.g., Hyderabad, Telangana"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1">Price (in EUR)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="e.g., 500000"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block font-medium mb-1">Area (Acre)</label>
            <input
              type="number"
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              placeholder="e.g., 1200"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Upload Photos */}
          <div>
            <label className="block font-medium mb-1">Upload Photos</label>
            <input
              type="file"
              name="photos"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
            />
            <label>I agree to the terms and conditions</label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
          >
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandlordDashboard;
