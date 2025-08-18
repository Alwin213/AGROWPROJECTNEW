import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function SignUpAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const existingAdmins =
      JSON.parse(localStorage.getItem("adminDetails")) || [];

    const updatedAdmins = [
      ...existingAdmins,
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    ];

    localStorage.setItem("adminDetails", JSON.stringify(updatedAdmins));

    setPopup(true);
    setTimeout(() => {
      setPopup(false);
      navigate("/login-admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-indigo-500 to-purple-500">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Admin Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring focus:border-blue-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>

        {popup && (
          <div className="mt-4 text-green-600 text-center font-medium">
            ✅ Admin signup successful! Redirecting...
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUpAdmin;
