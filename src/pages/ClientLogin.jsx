import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleLogin = (e) => {
  e.preventDefault();

  const storedClients = JSON.parse(localStorage.getItem('clientDetails')) || [];
  const matchedClient = storedClients.find(
    (client) =>
      client.email === formData.email &&
      client.password === formData.password
  );

  if (matchedClient) {
    toast.success('✅ Login successful!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  } else {
    toast.error('❌ Invalid email or password');
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Client Login</h2>

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              required
            />
            <div
              className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 rounded-lg font-semibold hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <a href="/signup-client" className="text-blue-600 font-medium">
            Sign up
          </a>
        </p>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ClientLogin;
