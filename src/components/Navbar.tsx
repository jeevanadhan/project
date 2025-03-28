import React from "react";
import { Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center border-b-2 border-neon-blue">
      <Link to="/" className="flex items-center">
        <Shield className="h-6 w-6 text-neon-pink" />
        <span className="ml-2 font-bold text-xl text-neon-green">🚀 SecuShare</span>
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/upload" className="hover:text-neon-blue transition duration-300">Upload</Link>
        <Link to="/share" className="hover:text-neon-blue transition duration-300">Share</Link>
        <Link to="/how-it-works" className="hover:text-neon-blue transition duration-300">How it Works</Link>

        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-neon-purple">👤 {user.username}</span>
            <button onClick={handleLogout} className="bg-neon-red px-4 py-2 rounded-md font-bold hover:shadow-neon-red transition">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/signin" className="bg-neon-blue px-4 py-2 rounded-md font-bold hover:shadow-neon-blue transition">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
