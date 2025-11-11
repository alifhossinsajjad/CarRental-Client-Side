import React, { useEffect, useState } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { 
  FaStar, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaGasPump, 
  FaCog, 
  FaPlay, 
  FaPause,
  FaHeart,
  FaShare,
  FaArrowRight
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";

const Carousel = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoplayPlaying, setAutoplayPlaying] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-96 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl flex items-center justify-center border border-gray-200">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Discovering amazing cars...</p>
        </div>
      </div>
    );
  }

  const featuredCars = cars.slice(0, 6);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white">
      {/* Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-sm">Featured Premium Cars</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-white/80 hover:text-white transition-colors">
              <FaShare size={14} />
            </button>
            <button
              onClick={() => setAutoplayPlaying(!autoplayPlaying)}
              className="text-white/80 hover:text-white transition-colors"
              title={autoplayPlaying ? "Pause" : "Play"}
            >
              {autoplayPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
            </button>
          </div>
        </div>
      </div>

      <Swiper
        speed={800}
        centeredSlides={true}
        spaceBetween={30}
        autoplay={autoplayPlaying ? {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} modern-bullet"></span>`;
          },
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="modern-swiper h-96 md:h-[500px]"
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1.2,
          },
          1024: {
            slidesPerView: 1.5,
          },
        }}
      >
        {featuredCars.map((car) => (
          <SwiperSlide key={car._id}>
            <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Image Section */}
                <div className="relative bg-gray-100 h-64 lg:h-full">
                  <img
                    src={car.image}
                    alt={car.carName}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                      car.status === "Available" 
                        ? "bg-green-500 text-white" 
                        : "bg-orange-500 text-white"
                    }`}>
                      {car.status}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold backdrop-blur-sm">
                      {car.carCategory}
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                    <FaHeart className="text-gray-600 hover:text-red-500 transition-colors" size={14} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6 lg:p-8 flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                          {car.carName}
                        </h3>
                        <p className="text-gray-600 text-lg">{car.carModel}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                          ${car.rentPricePerDay}
                          <span className="text-sm text-gray-500">/day</span>
                        </div>
                        <div className="flex items-center gap-1 justify-end mt-1">
                          <FaStar className="text-yellow-400 fill-current" size={14} />
                          <span className="text-sm text-gray-600">4.8 (128)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {car.description?.substring(0, 100)}...
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Key Features</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <FaUsers className="text-blue-600 mx-auto mb-2" size={18} />
                        <div className="text-sm font-semibold text-gray-900">5 Seats</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                        <FaCog className="text-green-600 mx-auto mb-2" size={18} />
                        <div className="text-sm font-semibold text-gray-900">Auto</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                        <FaGasPump className="text-purple-600 mx-auto mb-2" size={18} />
                        <div className="text-sm font-semibold text-gray-900">
                          {car.carCategory === "Electric" ? "Electric" : "Petrol"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="text-sm">Dhaka, Bangladesh</span>
                    </div>
                    
                    <Link 
                      to={`/car-details/${car._id}`}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl"
                    >
                      Book Now
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style jsx>{`
        .modern-swiper {
          border-radius: 1.5rem;
          padding: 60px 20px 40px 20px;
        }
        
        .modern-bullet {
          background: #cbd5e1;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          transition: all 0.3s ease;
          margin: 0 4px !important;
          opacity: 0.6;
        }
        
        .modern-bullet:hover {
          background: #64748b;
          transform: scale(1.2);
        }
        
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 24px;
          border-radius: 6px;
          transform: scale(1.1);
          opacity: 1;
        }
        
        .swiper-pagination {
          bottom: 15px !important;
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          color: #2563eb;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #2563eb;
          color: white;
        }
        
        .swiper-slide {
          opacity: 0.6;
          transform: scale(0.9);
          transition: all 0.4s ease;
        }
        
        .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
};

export default Carousel;