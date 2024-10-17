import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaCaretDown } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext'; 

const DashboardLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Dashboard</h1>

        {/* User Profile Dropdown */}
        <div className="relative flex items-center">
          <span className="text-sm">Welcome, {username || 'User'}</span>
          <div className="w-10 h-10 rounded-full cursor-pointer ml-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </div>
          <button
            onClick={toggleMenu}
            className="ml-2 focus:outline-none"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <FaCaretDown className="text-white" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-60 w-48 bg-white shadow-lg rounded-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">Account Settings</li>
                <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">My Orders</li>
                <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">Wishlist</li>
                <li
                  className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden sm:block">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="block py-2 px-4 rounded hover:bg-gray-700">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="block py-2 px-4 rounded hover:bg-gray-700">
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
