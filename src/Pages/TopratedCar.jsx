import React, { useEffect, useState } from "react";
import Loading from "../Pages/Loding";
import BrowseCarsCard from "../Components/BrowseCarsCard";
import {
  FaCrown,
  FaArrowRight,
  FaCar,
  FaStar,
  FaCheckCircle,
  FaShieldAlt,
  FaQuoteLeft,
} from "react-icons/fa";
import { Link } from "react-router";

import person1 from '../assets/person1.jpeg'
import person2 from '../assets/person2.jpeg'
// import person3 from '../assets/person3.jpeg'
import person4 from '../assets/person4.jpg'
import person5 from '../assets/person5.jpg'

const TopratedCar = () => {
  const [topRatedCars, setTopRatedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Executive",
      image: person1, // Just use the imported image directly
      rating: 5,
      text: "The BMW M5 I rented was absolutely phenomenal! The service was exceptional and the car was in perfect condition. Will definitely book again!",
      car: "BMW M5 Competition",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Travel Enthusiast",
      image: person2,
      rating: 5,
      text: "Incredible experience with the Mercedes S-Class. The luxury and comfort exceeded my expectations. Top-notch service from start to finish.",
      car: "Mercedes-Benz S-Class",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Luxury Car Collector",
      image: person5,
      rating: 5,
      text: "As someone who appreciates fine automobiles, I was thoroughly impressed with the Porsche 911. Flawless performance and premium service.",
      car: "Porsche 911 Turbo S",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Corporate Client",
      image: person4,
      rating: 5,
      text: "Our company has been using their services for executive transportation. The Audi RS e-tron GT was spectacular and reliability is unmatched.",
      car: "Audi RS e-tron GT",
    },
  ];

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${
          index < rating ? "text-yellow-400" : "text-gray-300"
        } text-sm`}
        fill={index < rating ? "currentColor" : "none"}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading />
      </div>
    );
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden ">

      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

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
            Discover our most beloved vehicles with exceptional ratings. These
            premium cars offer unparalleled comfort and performance for your
            journey.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 min-w-[140px]">
              <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                {topRatedCars.length}
                <FaCheckCircle className="text-green-500 text-xl" />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                Premium Cars
              </p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 min-w-[140px]">
              <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                {
                  topRatedCars.filter((car) => car.status === "available")
                    .length
                }
                <FaCar className="text-blue-500 text-xl" />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                Available Now
              </p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 min-w-[140px]">
              <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                4.9+
                <FaStar className="text-yellow-500 text-xl" />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                Min Rating
              </p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 min-w-[140px]">
              <div className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <FaShieldAlt className="text-emerald-500 text-xl" />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                Premium Quality
              </p>
            </div>
          </div>
        </div>

   
        {topRatedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {topRatedCars.map((car) => (
              <div key={car._id} className="group relative">
     
                <div className="absolute -top-3 -right-3 z-20">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                    <FaCrown size={12} />
                    <span>TOP RATED</span>
                  </div>
                </div>

                <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-100 overflow-hidden">
         
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

           
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                  <BrowseCarsCard car={car} />

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
              We're constantly adding new premium vehicles. Check back soon for
              our top-rated collection!
            </p>
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full text-sm font-medium">
              <FaStar className="text-yellow-500" />
              <span>New arrivals coming soon</span>
            </div>
          </div>
        )}

        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg shadow-purple-500/25">
              <FaStar className="text-white" />
              <span>Customer Stories</span>
            </div>

            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Clients Say
              </span>
            </h3>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. Hear from our satisfied customers
              who experienced luxury with our top-rated vehicles.
            </p>
          </div>

          {/* testimonial Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            
              <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <FaQuoteLeft className="text-purple-500 text-2xl" />
              </div>

  
              <div className="flex items-center gap-1 mb-6">
                {renderStars(testimonials[activeTestimonial].rating)}
              </div>

         
              <p className="text-gray-700 text-lg leading-relaxed mb-6 pr-8">
                "{testimonials[activeTestimonial].text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonials[activeTestimonial].role}
                  </p>
                  <p className="text-purple-600 text-sm font-medium mt-1">
                    Rented: {testimonials[activeTestimonial].car}
                  </p>
                </div>
              </div>

        
              <div className="flex gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

          
            <div className="grid grid-cols-1 gap-6">
              {testimonials
                .filter((_, index) => index !== activeTestimonial)
                .slice(0, 2)
                .map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() =>
                      setActiveTestimonial(
                        testimonials.findIndex((t) => t.id === testimonial.id)
                      )
                    }
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                          "{testimonial.text}"
                        </p>
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">
                            {testimonial.name}
                          </h5>
                          <p className="text-gray-500 text-xs">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <p className="text-sm text-gray-600 mt-1">Happy Clients</p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <p className="text-sm text-gray-600 mt-1">Average Rating</p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <p className="text-sm text-gray-600 mt-1">Repeat Customers</p>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <p className="text-sm text-gray-600 mt-1">Support</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <div className="relative bg-white rounded-3xl p-12 shadow-2xl border border-gray-200 max-w-4xl mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>

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
                Join thousands of satisfied customers who've chosen our
                top-rated vehicles for their exceptional journeys. Experience
                luxury like never before.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to={"/browse-cars"}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group"
                >
                  Explore All Premium Cars
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
0
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