import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginAdmin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedAdmins = JSON.parse(localStorage.getItem('adminDetails')) || [];

    const matchedAdmin = storedAdmins.find(
      admin => admin.email === formData.email && admin.password === formData.password
    );

    if (matchedAdmin) {
      toast.success('✅ Admin logged in successfully!');
      setTimeout(() => navigate('/dashboard/admin-dashboard'), 1500);
    } else {
      toast.error('❌ Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-400"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-400"
              required
            />
            <div
              className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:opacity-90"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{' '}
          <a href="/signup-admin" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default LoginAdmin;
