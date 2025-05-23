import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Coffee, Mail, Info } from 'lucide-react';

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();

  // Automatically update collapse state on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`
      h-full bg-white  transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-60'}
    `}>
      <div className="flex flex-col h-full">
        {/* Header - remove toggle button */}
        <div className="flex items-center justify-center h-18 px-4 border-b border-gray-100">
          <span className="text-indigo-600 font-bold text-lg">
            {isCollapsed ? "US" : "UpSkills"}
          </span>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link to="/" className={`
                flex items-center py-2 px-3 rounded-lg transition-colors
                ${isActive("/") ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}
                ${isCollapsed ? 'justify-center' : ''}
              `} title={isCollapsed ? "Home" : ""}>
                <Home size={20} className={isActive("/") ? 'text-indigo-600' : 'text-gray-500'} />
                {!isCollapsed && <span className="ml-3">Home</span>}
              </Link>
            </li>
            <li>
              <Link to="/courses" className={`
                flex items-center py-2 px-3 rounded-lg transition-colors
                ${isActive("/courses") ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}
                ${isCollapsed ? 'justify-center' : ''}
              `} title={isCollapsed ? "Courses" : ""}>
                <BookOpen size={20} className={isActive("/courses") ? 'text-indigo-600' : 'text-gray-500'} />
                {!isCollapsed && <span className="ml-3">Courses</span>}
              </Link>
            </li>
            <li>
              <Link to="/donuts" className={`
                flex items-center py-2 px-3 rounded-lg transition-colors
                ${isActive("/donuts") ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}
                ${isCollapsed ? 'justify-center' : ''}
              `} title={isCollapsed ? "Donuts" : ""}>
                <Coffee size={20} className={isActive("/donuts") ? 'text-indigo-600' : 'text-gray-500'} />
                {!isCollapsed && <span className="ml-3">Donuts</span>}
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`
                flex items-center py-2 px-3 rounded-lg transition-colors
                ${isActive("/contact") ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}
                ${isCollapsed ? 'justify-center' : ''}
              `} title={isCollapsed ? "Contact" : ""}>
                <Mail size={20} className={isActive("/contact") ? 'text-indigo-600' : 'text-gray-500'} />
                {!isCollapsed && <span className="ml-3">Contact</span>}
              </Link>
            </li>
            <li>
              <Link to="/about" className={`
                flex items-center py-2 px-3 rounded-lg transition-colors
                ${isActive("/about") ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}
                ${isCollapsed ? 'justify-center' : ''}
              `} title={isCollapsed ? "About" : ""}>
                <Info size={20} className={isActive("/about") ? 'text-indigo-600' : 'text-gray-500'} />
                {!isCollapsed && <span className="ml-3">About</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center'}`}>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">US</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">User Settings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
