import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, UserPlus, LogIn, ShieldCheck } from "lucide-react";

const HomePage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/farmland-bg.jpeg')",
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-green-900/20"></div>

      <motion.div
        className="relative bg-white p-10 rounded-lg shadow-xl w-full max-w-xl text-center space-y-6 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 text-green-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Home size={32} />
          <h1 className="text-4xl font-bold">Welcome to Agrow</h1>
        </motion.div>

        <motion.p
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Please choose how you'd like to proceed:
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {/* Landlord */}
          <Link
            to="/signup-landlord"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            <UserPlus size={20} />
            Sign Up as Landlord
          </Link>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            <LogIn size={20} />
            Login as Landlord
          </Link>

          {/* Client */}
          <Link
            to="/signup-client"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition"
          >
            <UserPlus size={20} />
            Sign Up as Farmer
          </Link>

          <Link
            to="/login-client"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
          >
            <LogIn size={20} />
            Login as Farmer
          </Link>

          {/* Admin */}
          <Link
            to="/signup-admin"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            <ShieldCheck size={20} />
            Sign Up as Admin
          </Link>

          <Link
            to="/login-admin"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            <ShieldCheck size={20} />
            Login as Admin
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
