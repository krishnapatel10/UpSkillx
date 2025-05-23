import React, { useState, useEffect, useRef } from 'react';
import { Search, LogIn, UserCircle, Bell, Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [notifications, setNotifications] = useState(3);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const checkAuth = () => {
    //         let token = localStorage.getItem('token');
    //         let user = localStorage.getItem('user');

    //         if (token && user) {
    //             try {
    //                 const parsedUserData = JSON.parse(user);
    //                 setIsLoggedIn(true);
    //                 setUserData(parsedUserData);
    //             } catch (error) {
    //                 console.error("Failed to parse user data:", error);
    //                 handleLogout();
    //             }
    //         }
    //     };
    //     checkAuth();
    //     window.addEventListener('storage', checkAuth);
    //     return () => window.removeEventListener('storage', checkAuth);
    // }, []);

    useEffect(() => {
        async function GetData() {
            let token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
                let user = localStorage.getItem('user');
                if (user) {
                    setUserData(JSON.parse(user));
                }
            }
        }
        GetData()
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserData(null);
        setIsDropdownOpen(false);
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-30 shadow-sm w-full">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-indigo-600">UpSkills</Link>

                {/* Right side */}
                <div className="flex items-center">
                    
                    {/* Mobile menu button */}
                    
                    <div className="md:hidden">
                        
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            {userData?.profilePicture ? (
                                <img
                                    src={userData.profilePicture}
                                    alt={userData.name}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500 hover:scale-105 transition-transform duration-200 cursor-pointer shadow"
                                />
                            ) : (
                                <UserCircle size={32} className="text-gray-600" />
                            )}

                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-medium text-gray-700">{userData?.name}</p>
                                <p className="text-sm text-gray-500">Premium Member</p>
                            </div>
                        </button>
                          {/* User Dropdown */}
                        {isDropdownOpen && (
                            <div className="absolute right-1 top-full  w-38 bg-white rounded-md shadow-lg py-1 z-50">
                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                <Link to="/my-courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Courses</Link>
                                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Desktop nav items */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                {/* Bell */}
                                <div className="relative">
                                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                                        <Bell size={20} />
                                        {notifications > 0 && (
                                            <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {notifications}
                                            </span>
                                        )}
                                    </button>
                                </div>

                                {/* User Dropdown */}
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

                                        <div className="hidden lg:block text-left">
                                            <p className="text-sm font-medium text-gray-700">{userData?.name}</p>
                                            <p className="text-sm text-gray-500">Premium Member</p>
                                        </div>
                                    </button>

                                    {/* Dropdown */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                            <Link to="/my-courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Courses</Link>
                                            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-4 py-2 rounded-lg text-indigo-600 hover:bg-indigo-50 flex items-center"
                                >
                                    <LogIn size={18} className="mr-2" />
                                    Log In
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>




            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden pt-4 pb-3 border-t mt-3">
                    {isLoggedIn ? (
                        <>
                            {/* Bell */}
                            <div className="relative">
                                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                                    <Bell size={20} />
                                    {notifications > 0 && (
                                        <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {notifications}
                                        </span>
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center space-x-3 px-4 py-2 mb-3">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    {userData?.profilePicture ? (
                                        <img
                                            src={userData.profilePicture}
                                            alt={userData.name}
                                            className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500 hover:scale-105 transition-transform duration-200 cursor-pointer shadow"
                                        />
                                    ) : (
                                        <UserCircle size={32} className="text-gray-600" />
                                    )}

                                    <div className="hidden lg:block text-left">
                                        <p className="text-sm font-medium text-gray-700">{userData?.name}</p>
                                        <p className="text-sm text-gray-500">Premium Member</p>
                                    </div>
                                </button>
                                <div>
                                    <p className="font-medium text-gray-800">{userData.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {userData.role === 'user' ? 'Member' : 'Administrator'}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100">
                                <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Profile</Link>
                                <Link to="/my-courses" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">My Courses</Link>
                                <Link to="/settings" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Settings</Link>

                                <div className="px-4 py-3 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Bell size={20} className="text-gray-500 mr-3" />
                                            <span className="font-medium text-gray-700">Notifications</span>
                                        </div>
                                        {notifications > 0 && (
                                            <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {notifications}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 mt-2">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center px-4 py-3 text-red-600 hover:bg-gray-100 w-full"
                                    >
                                        <LogOut size={20} className="mr-3" />
                                        <span className="font-medium">Log out</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-2 px-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 flex items-center justify-center"
                            >
                                <LogIn size={18} className="mr-2" />
                                Log In
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white flex items-center justify-center"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
