import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <h2 className="text-xl font-bold text-blue-600">UpSkillX Admin</h2>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-6">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
