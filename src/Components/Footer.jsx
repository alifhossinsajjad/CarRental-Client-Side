import React from "react";
import { FaAward, FaCar, FaEnvelope, FaFacebook, FaHeadset, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaShieldAlt, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
       <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-600 rounded-xl">
                <FaCar className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  RentWheels
                </h2>
                <p className="text-sm text-gray-400">Premium Car Rentals</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for premium car rentals. Experience luxury, comfort, and reliability with every journey.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <FaShieldAlt className="text-green-400" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <FaAward className="text-yellow-400" />
                <span>24/7 Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-700 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110">
                <FaFacebook className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-blue-400 rounded-lg transition-all duration-300 transform hover:scale-110">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-pink-600 rounded-lg transition-all duration-300 transform hover:scale-110">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-110">
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Browse Cars", href: "/browse-cars" },
                { name: "Featured Deals", href: "/featured" },
                { name: "How It Works", href: "/how-it-works" },
                { name: "Testimonials", href: "/testimonials" },
                { name: "Blog & News", href: "/blog" },
                { name: "Careers", href: "/careers" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-blue-400 transition-colors"></div>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Our Services
            </h3>
            <ul className="space-y-3">
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
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-green-400 transition-colors"></div>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Our Location</p>
                  <p className="text-gray-400 text-sm">123 Drive Street, Auto City</p>
                  <p className="text-gray-400 text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaPhone className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Call Us</p>
                  <p className="text-gray-400 text-sm">+88 018 2422 5334</p>
                  <p className="text-gray-400 text-sm">+88 019 1466 6208 </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Email Us</p>
                  <p className="text-gray-400 text-sm">support@rentwheels.com</p>
                  <p className="text-gray-400 text-sm">bookings@rentwheels.com</p>
                </div>
              </div>

              {/* Support Badge */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3">
                  <FaHeadset className="text-white text-xl" />
                  <div>
                    <p className="text-white font-semibold">24/7 Support</p>
                    <p className="text-blue-100 text-sm">Always here to help you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Subscribe to get special offers, free giveaways, and exclusive deals.</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} RentWheels. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="btn btn-circle btn-primary shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300">
          <FaHeadset className="text-xl" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
