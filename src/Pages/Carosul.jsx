import React, { useEffect, useState } from "react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaCar, FaStar, FaMapMarkerAlt, FaUsers, FaGasPump, FaCog, FaPlay, FaPause } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
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
      <div className="h-96 bg-gradient-to-br from-gray-100 to-blue-50 rounded-3xl flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-gray-600 font-medium">Loading premium cars...</p>
        </div>
      </div>
    );
  }

  const featuredCars = cars.slice(0, 6);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
      {/* Autoplay Control */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setAutoplayPlaying(!autoplayPlaying)}
          className="btn btn-circle btn-sm glass text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
          title={autoplayPlaying ? "Pause" : "Play"}
        >
          {autoplayPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
        </button>
      </div>

      <Swiper
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        speed={1200}
        centeredSlides={true}
        autoplay={autoplayPlaying ? {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        modules={[Autoplay, Pagination, EffectCreative]}
        className="mySwiper h-96 md:h-[500px] lg:h-[600px]"
      >
        {featuredCars.map((car) => (
          <SwiperSlide key={car._id}>
            <div 
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${car.image})` }}
            >
           
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>

           
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-white rounded-full animate-pulse delay-1000"></div>
              </div>

       
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="max-w-2xl text-white">
                    
                    {/* Premium Badge */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
                        car.status === "Available" 
                          ? "bg-green-500/20 border-green-400/50 text-green-300" 
                          : "bg-orange-500/20 border-orange-400/50 text-orange-300"
                      }`}>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          car.status === "Available" ? "bg-green-400" : "bg-orange-400"
                        }`}></div>
                        <span className="text-sm font-semibold">{car.status}</span>
                      </div>
                      
                      {/* Category Tag */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30">
                        <FaCar className="text-blue-300" size={12} />
                        <span className="text-sm text-blue-300 font-medium">{car.carCategory}</span>
                      </div>
                    </div>

                    {/* Car Name and Model */}
                    <div className="mb-6">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {car.carName}
                      </h2>
                      <div className="flex items-center gap-3">
                        <span className="text-xl md:text-2xl text-blue-300 font-light">
                          {car.carModel} Model
                        </span>
                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                        <span className="text-lg text-gray-300">{car.providerName}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl font-light">
                      {car.description?.substring(0, 120)}...
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
                      <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                        <FaUsers className="text-blue-400 mx-auto mb-2" size={18} />
                        <div className="text-white font-semibold">5 Seats</div>
                      </div>
                      <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                        <FaCog className="text-blue-400 mx-auto mb-2" size={18} />
                        <div className="text-white font-semibold">Auto</div>
                      </div>
                      <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                        <FaGasPump className="text-blue-400 mx-auto mb-2" size={18} />
                        <div className="text-white font-semibold">
                          {car.carCategory === "Electric" ? "Electric" : "Petrol"}
                        </div>
                      </div>
                    </div>

           
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-3xl md:text-4xl font-bold text-white">
                            ${car.rentPricePerDay}
                            <span className="text-lg text-gray-300 ml-2">/day</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar key={star} className="fill-current" size={14} />
                              ))}
                            </div>
                            <span className="text-gray-300 text-sm">4.8 (128 reviews)</span>
                          </div>
                        </div>
                      </div>

                    
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mt-6 text-gray-300">
                      <FaMapMarkerAlt className="text-red-400" />
                      <span>Available in Dhaka, Bangladesh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style jsx>{`
        .mySwiper {
          border-radius: 1.5rem;
        }
        
        .custom-bullet {
          background: rgba(255, 255, 255, 0.6);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transition: all 0.3s ease;
          margin: 0 6px !important;
        }
        
        .custom-bullet:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: scale(1.3);
        }
        
        .swiper-pagination-bullet-active {
          background: #3B82F6 !important;
          width: 30px;
          border-radius: 8px;
          transform: scale(1.2);
        }
        
        .swiper-pagination {
          bottom: 20px !important;
        }
      `}</style>
    </div>
  );
};

export default Carousel;