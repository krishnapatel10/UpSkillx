import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Token from localStorage
  const token = localStorage.getItem("token");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <h2 className="text-xl font-bold text-blue-600">UpSkillX Admin</h2>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  location.pathname === "/"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-blue-100"
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
                    : "text-gray-700 hover:bg-blue-100"
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
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                Users
              </Link>
            </li>

            {/* Profile / Login */}
            {token ? (
              <li className="relative group">
                <button className="px-3 py-2 rounded-full bg-blue-600 text-white font-medium focus:outline-none">
                  👤
                </button>
                {/* Dropdown */}
                <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
