import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        console.log("Logged out successfully");
        setIsDropdownOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/add-car", label: "Add Car", private: true },
    { path: "/my-listings", label: "My Listings", private: true },
    { path: "/my-bookings", label: "My Bookings", private: true },
    { path: "/browse-cars", label: "Browse Cars" },
  ];

  const filteredNavLinks = navLinks.filter((link) => !link.private || user);

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-blue-500/20">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.92 2.01C18.72 1.42 18.16 1 17.5 1h-11c-.66 0-1.21.42-1.42 1.01L3 8v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8l-2.08-5.99zM6.5 12c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9s1.5.67 1.5 1.5S7.33 12 6.5 12zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 7l1.5-4.5h11L19 7H5z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent tracking-tight">
                  AutoElite
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  PREMIUM CARS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {filteredNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-1 py-2 font-medium transition-all duration-300 group ${
                    isActive
                      ? "text-blue-700"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300 scale-x-0 group-hover:scale-x-100 group-[&.active]:scale-x-100"></span>
              </NavLink>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-6">
            {/* Desktop User Menu */}
            {user ? (
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-blue-50">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold text-sm">
                        {user.displayName?.charAt(0) ||
                          user.email?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-200/80 py-3 z-50 backdrop-blur-sm">
                    <div className="px-5 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center space-x-3 rounded-xl border border-transparent hover:border-red-100"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/auth/login"
                  className="px-6 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-blue-500/20"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <span
                  className={`block h-0.5 bg-gray-600 transition-all duration-300 group-hover:bg-blue-600 ${
                    isMobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-gray-600 transition-all duration-300 group-hover:bg-blue-600 ${
                    isMobileMenuOpen ? "opacity-0" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-gray-600 transition-all duration-300 group-hover:bg-blue-600 ${
                    isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/80 mt-3 py-6 absolute left-4 right-4 z-40">
            {/* Navigation Links */}
            <div className="space-y-3 px-6">
              {filteredNavLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-4 rounded-xl font-medium transition-all duration-200 border-2 ${
                      isActive
                        ? "text-blue-700 bg-blue-50 border-blue-200"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 border-transparent hover:border-blue-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* User Section - Mobile */}
            {user ? (
              <div className="border-t border-gray-100 mt-6 pt-6 px-6">
                <div className="flex items-center space-x-4 px-4 py-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md overflow-hidden ring-2 ring-white">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold text-base">
                        {user.displayName?.charAt(0) ||
                          user.email?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-4 py-4 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-all duration-200 flex items-center justify-center space-x-3 border-2 border-transparent hover:border-red-100"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-semibold">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-100 mt-6 pt-6 px-6 space-y-4">
                <Link
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-4 text-center text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 border-2 border-transparent hover:border-gray-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-4 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-500/20"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Overlay for dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
