import React, { useState, useEffect, useRef } from "react";
import { Bell, LogIn, LogOut, UserCircle, Rocket } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  // const [notifications, setNotifications] = useState(2);

  const dropdownRef = useRef(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      let user = localStorage.getItem("user");
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
  }, []);

  // outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-3 backdrop-blur-lg bg-white/60 shadow-sm border-b border-white/20">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            <Link to="/">UpSkillX Admin</Link>
          </span>
        </div>

        {/* Navigation Menu */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                location.pathname === "/"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                location.pathname === "/courses"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                location.pathname === "/user"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              Users
            </Link>
          </li>

          {/* Profile / Login */}
          {isLoggedIn ? (
            <>
              {/* Notifications */}
              {/* <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600">
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div> */}

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  {userData?.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt={userData.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 hover:scale-105 transition-transform duration-200 cursor-pointer shadow"
                    />
                  ) : (
                    <UserCircle size={32} className="text-gray-600" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="inline mr-2" size={16} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <li>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center"
              >
                <LogIn size={18} className="mr-2" />
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
