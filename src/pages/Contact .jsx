import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    propertyType: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newEntry = {
      ...form,
      submittedAt: new Date().toISOString(),
    };

    // Get existing submissions from localStorage
    const existing =
      JSON.parse(localStorage.getItem("contactSubmissions")) || [];

    // Save updated list
    localStorage.setItem(
      "contactSubmissions",
      JSON.stringify([...existing, newEntry])
    );

    alert("Submission saved and sent via WhatsApp!");

    // Optional: Reset form
    setForm({
      name: "",
      phone: "",
      email: "",
      area: "",
      propertyType: "",
      description: "",
    });

  };

  return (
    <form className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Contact Form</h1>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="area"
        placeholder="Selected Area"
        value={form.area}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <select
        name="propertyType"
        value={form.propertyType}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Property Type</option>
        <option value="Building">Building</option>
        <option value="Open Plot">Open Plot</option>
        <option value="Flat">Flat</option>
        <option value="House">House</option>
        <option value="Farmland">Farmland</option>
        <option value="Other">Other</option>
      </select>
      <textarea
        name="description"
        placeholder="Describe the property..."
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows="4"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
