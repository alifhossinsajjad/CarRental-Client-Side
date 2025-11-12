import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCar,
  FaCrown,
  FaHandSparkles,
  FaHeart,
  FaPause,
  FaPlay,
  FaStar,
} from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoplayPlaying, setAutoplayPlaying] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
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
      <div className="h-[600px] bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">
            Discovering amazing cars...
          </p>
        </div>
      </div>
    );
  }

  const featuredCars = cars.slice(0, 6);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-[600px]">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-white rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/40 to-transparent py-6 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-bold text-lg tracking-wide">
              DISCOVER PREMIUM CARS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAutoplayPlaying(!autoplayPlaying)}
              className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110 bg-white/10 backdrop-blur-sm rounded-lg p-2"
              title={autoplayPlaying ? "Pause" : "Play"}
            >
              {autoplayPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
            </button>
          </div>
        </div>
      </div>

      <Swiper
        speed={1000}
        centeredSlides={true}
        spaceBetween={0}
        autoplay={
          autoplayPlaying
            ? {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        pagination={{
          clickable: true,
          renderBullet: function (className) {
            return `<span class="${className} premium-bullet"></span>`;
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="premium-swiper h-[600px] w-full"
        breakpoints={{
          1024: {
            slidesPerView: 1.2,
          },
        }}
      >
        {featuredCars.map((car) => (
          <SwiperSlide key={car._id}>
            <div className="w-full h-full relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${car.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-black/30"></div>
              </div>

              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-8 lg:px-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white max-w-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-400/50">
                          <FaCrown className="text-amber-300" />
                          <span className="text-amber-300 font-semibold text-sm">
                            PREMIUM SELECTION
                          </span>
                        </div>
                      </div>

                      <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {car.carName}
                      </h1>

                      <p className="text-2xl text-blue-300 mb-8 font-light italic">
                        Experience the extraordinary...
                      </p>

                      {/* Mystery Features */}
                      <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
                        <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                          <FaHandSparkles
                            className="text-blue-400 mx-auto mb-2"
                            size={20}
                          />
                          <div className="text-white font-semibold">
                            Premium
                          </div>
                          <div className="text-blue-300 text-sm">Features</div>
                        </div>
                        <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                          <FaStar
                            className="text-yellow-400 mx-auto mb-2"
                            size={20}
                          />
                          <div className="text-white font-semibold">
                            Exclusive
                          </div>
                          <div className="text-yellow-300 text-sm">Design</div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <p className="text-xl text-gray-300 mb-4">
                          Ready for an unforgettable driving experience?
                        </p>
                        <div className="flex items-center gap-2 text-lg text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Available for your next adventure
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link
                          to={"/browse-cars"}
                          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-3xl text-lg overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          <span>Browse the car</span>
                          <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-200" />
                        </Link>

                        <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-3 hover:shadow-2xl">
                          <FaHeart />
                          Save
                        </button>
                      </div>

                      {/* Social Proof */}
                      <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <FaStar className="text-yellow-400" />
                          <FaStar className="text-yellow-400" />
                          <FaStar className="text-yellow-400" />
                          <FaStar className="text-yellow-400" />
                        </div>
                        <span>Rated by 100+ travelers</span>
                      </div>
                    </div>

                    {/* Right Side - Visual Teaser */}
                    <div className="hidden lg:flex justify-end">
                      <div className="relative">
                        {/* Mystery Box */}
                        <div className="relative group">
                          <div className="w-96 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl border-2 border-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                            {/* Animated Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500"></div>

                            <div className="text-center text-white/80 p-8">
                              <div className="text-4xl mb-4">
                                <FaCar />
                              </div>
                              <p className="text-xl font-semibold mb-2">
                                What's Inside?
                              </p>
                              <p className="text-sm opacity-80">
                                Click to uncover premium features and exclusive
                                details
                              </p>
                            </div>
                          </div>

                          {/* Floating Elements */}
                          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
                          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev premium-nav"></div>
      <div className="swiper-button-next premium-nav"></div>

      {/* Bottom CTA */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <p className="text-white/70 text-sm mb-2">
          Scroll to explore more amazing cars
        </p>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .premium-swiper {
          width: 100%;
        }

        .premium-bullet {
          background: rgba(255, 255, 255, 0.5);
          width: 12px;
          height: 12px;
          border-radius: 6px;
          transition: all 0.4s ease;
          margin: 0 8px !important;
          opacity: 0.7;
        }

        .premium-bullet:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: scale(1.3);
        }

        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
          width: 40px;
          border-radius: 10px;
          transform: scale(1.2);
          opacity: 1;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }

        .swiper-pagination {
          bottom: 80px !important;
        }

        .premium-nav {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .premium-nav:after {
          font-size: 20px;
          font-weight: bold;
        }

        .premium-nav:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.6);
          transform: scale(1.1);
        }

        .swiper-slide {
          opacity: 0.4;
          transform: scale(0.9);
          transition: all 0.6s ease;
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
