import React, { useState, useEffect, use } from "react";

import { AuthContext } from "../Context/AuthContext";
import { FaCar, FaSun, FaMoon } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, logOutUser } = use(AuthContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("Logged out successfully");
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
    <nav className="bg-base-100/95 backdrop-blur-lg border-b border-base-300 sticky top-0 z-50 shadow-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-primary/20">
                <FaCar size={28} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                  AutoElite
                </span>
                <span className="text-xs text-base-content/70 font-medium tracking-wide">
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
                      ? "text-primary"
                      : "text-base-content hover:text-primary"
                  }`
                }
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300 scale-x-0 group-hover:scale-x-100 group-[&.active]:scale-x-100"></span>
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl hover:bg-base-300 transition-all duration-200 group"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FaMoon className="w-5 h-5 text-base-content group-hover:text-primary transition-colors" />
              ) : (
                <FaSun className="w-5 h-5 text-base-content group-hover:text-primary transition-colors" />
              )}
            </button>

            {user ? (
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-base-300 transition-all duration-200 border border-transparent hover:border-base-300"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md overflow-hidden ring-2 ring-base-100 ring-offset-2 ring-offset-base-100">
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
                    <p className="text-sm font-semibold text-base-content">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-base-content/70">{user.email}</p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-base-content/70 transition-transform duration-200 ${
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

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-base-100 rounded-2xl shadow-xl border border-base-300 py-3 z-50 backdrop-blur-sm">
                    <div className="px-5 py-3 border-b border-base-300">
                      <p className="text-sm font-semibold text-base-content">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-base-content/70 truncate mt-1">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-sm text-error hover:bg-error/10 transition-all duration-200 flex items-center space-x-3 rounded-xl border border-transparent hover:border-error/20"
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
                  className="px-6 py-2.5 text-base-content font-medium rounded-xl hover:bg-base-300 transition-all duration-200 border border-transparent hover:border-base-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-primary/20"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl hover:bg-base-300 transition-all duration-200 group"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <span
                  className={`block h-0.5 bg-base-content transition-all duration-300 group-hover:bg-primary ${
                    isMobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-base-content transition-all duration-300 group-hover:bg-primary ${
                    isMobileMenuOpen ? "opacity-0" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-base-content transition-all duration-300 group-hover:bg-primary ${
                    isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-base-100/98 backdrop-blur-lg rounded-3xl shadow-2xl border border-base-300 mt-3 py-6 absolute left-4 right-4 z-40">
            <div className="space-y-3 px-6">
              {filteredNavLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-4 rounded-xl font-medium transition-all duration-200 border-2 ${
                      isActive
                        ? "text-primary bg-primary/10 border-primary/20"
                        : "text-base-content hover:text-primary hover:bg-base-300 border-transparent hover:border-base-300"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {user ? (
              <div className="border-t border-base-300 mt-6 pt-6 px-6">
                <div className="flex items-center space-x-4 px-4 py-4 bg-primary/10 rounded-2xl border border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md overflow-hidden ring-2 ring-base-100">
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
                    <p className="text-sm font-semibold text-base-content truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-base-content/70 truncate mt-1">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-4 py-4 text-error font-medium rounded-xl hover:bg-error/10 transition-all duration-200 flex items-center justify-center space-x-3 border-2 border-transparent hover:border-error/20"
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
              <div className="border-t border-base-300 mt-6 pt-6 px-6 space-y-4">
                <Link
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-4 text-center text-base-content font-medium rounded-xl hover:bg-base-300 transition-all duration-200 border-2 border-transparent hover:border-base-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-4 text-center bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

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