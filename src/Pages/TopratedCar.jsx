import React, { useEffect, useState } from "react";
import Loading from "../Pages/Loding";
import BrowseCarsCard from "../Components/BrowseCarsCard";
import { FaCrown, FaArrowRight, FaCar, FaStar, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router";


const TopratedCar = () => {
  const [topRatedCars, setTopRatedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => {
        const filteredCars = data
          .filter((car) => car.rating >= 4.9)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);

        setTopRatedCars(filteredCars);
        setLoading(false);
      })
      .catch((error) => {
        console.error(" cars does not found:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading />
      </div>
    );
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg shadow-orange-500/25">
            <FaCrown className="text-white" />
            <span>Premium Selection</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Top Rated{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Luxury Cars
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Discover our most beloved vehicles with exceptional ratings. 
            These premium cars offer unparalleled comfort and performance for your journey.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 min-w-[140px]">
              <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                {topRatedCars.length}
                <FaCheckCircle className="text-green-500 text-xl" />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">Premium Cars</p>
            </div>
            
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 min-w-[140px]">
              <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                {topRatedCars.filter(car => car.status === 'available').length}
                <FaCar className="text-blue-500 text-xl" />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">Available Now</p>
            </div>
            
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 min-w-[140px]">
              <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                4.9+
                <FaStar className="text-yellow-500 text-xl" />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">Min Rating</p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 min-w-[140px]">
              <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <FaShieldAlt className="text-emerald-500 text-xl" />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">Premium Quality</p>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        {topRatedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRatedCars.map((car) => (
              <div
                key={car._id}
                className="group relative"
              >
                {/* Premium Badge */}
                <div className="absolute -top-3 -right-3 z-20">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                    <FaCrown size={12} />
                    <span>TOP RATED</span>
                  </div>
                </div>

                {/* Card Container */}
                <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-100 overflow-hidden">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  <BrowseCarsCard car={car} />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-8 shadow-lg">
              <FaCar className="text-6xl text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">
              No Top Rated Cars Available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto text-lg mb-8">
              We're constantly adding new premium vehicles. Check back soon for our top-rated collection!
            </p>
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full text-sm font-medium">
              <FaStar className="text-yellow-500" />
              <span>New arrivals coming soon</span>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="relative bg-white rounded-3xl p-12 shadow-2xl border border-gray-200 max-w-4xl mx-auto overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200 rounded-full translate-y-12 -translate-x-12 opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-amber-200 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                <FaCrown className="text-white" />
                <span>Exclusive Collection</span>
              </div>
              
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Experience Premium?
              </h3>
              
              <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who've chosen our top-rated vehicles for their exceptional journeys. 
                Experience luxury like never before.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to={'/browse-cars'} 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
                >
                  Explore All Premium Cars
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                
                
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaCheckCircle className="text-green-500" />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaShieldAlt className="text-blue-500" />
                  <span>Premium Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaStar className="text-yellow-500" />
                  <span>5-Star Rated Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopratedCar;