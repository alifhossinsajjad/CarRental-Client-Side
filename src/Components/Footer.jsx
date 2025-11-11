import React from "react";
import { FaAward, FaCar, FaEnvelope, FaFacebook, FaHeadset, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaShieldAlt, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";


const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-blue-600 rounded-xl">
                <FaCar className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  RentWheels
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">Premium Car Rentals</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Your trusted partner for premium car rentals. Experience luxury, comfort, and reliability with every journey.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                <FaShieldAlt className="text-green-400 text-sm" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                <FaAward className="text-yellow-400 text-sm" />
                <span>24/7 Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-4">
              {[
                { icon: FaFacebook, color: "hover:bg-blue-600" },
                { icon: FaTwitter, color: "hover:bg-blue-400" },
                { icon: FaInstagram, color: "hover:bg-pink-600" },
                { icon: FaLinkedin, color: "hover:bg-blue-700" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`p-2 bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-110 ${social.color}`}
                >
                  <social.icon className="text-sm sm:text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "My List", path: "/my-listings" },
                { name: "My Bookings", path: "/my-bookings" },
                { name: "Testimonials", path: "#" },
                { name: "Blog & News", path: "#" },
                { name: "Careers", path: "#" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-blue-400 transition-colors flex-shrink-0"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Our Services
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Luxury Car Rentals",
                "SUV & Family Cars",
                "Electric Vehicles",
                "Long Term Leasing",
                "Airport Transfers",
                "Corporate Rentals",
                "Wedding Cars",
                "Self Drive Options"
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group text-sm sm:text-base">
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-green-400 transition-colors flex-shrink-0"></div>
                    <span className="break-words">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Contact Info
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-red-400 mt-1 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <p className="text-gray-300 font-medium text-sm sm:text-base">Our Location</p>
                  <p className="text-gray-400 text-xs sm:text-sm">123 Drive Street, Auto City</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaPhone className="text-green-400 mt-1 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <p className="text-gray-300 font-medium text-sm sm:text-base">Call Us</p>
                  <p className="text-gray-400 text-xs sm:text-sm">+88 018 2422 5334</p>
                  <p className="text-gray-400 text-xs sm:text-sm">+88 019 1466 6208</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-blue-400 mt-1 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <p className="text-gray-300 font-medium text-sm sm:text-base">Email Us</p>
                  <p className="text-gray-400 text-xs sm:text-sm">support@rentwheels.com</p>
                  <p className="text-gray-400 text-xs sm:text-sm">bookings@rentwheels.com</p>
                </div>
              </div>

              {/* Support Badge */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                <div className="flex items-center gap-3">
                  <FaHeadset className="text-white text-lg sm:text-xl" />
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">24/7 Support</p>
                    <p className="text-blue-100 text-xs sm:text-sm">Always here to help you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm sm:text-base">Subscribe to get special offers, free giveaways, and exclusive deals.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 text-sm sm:text-base"
              />
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} RentWheels. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <a  className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a  className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a  className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              <a  className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;