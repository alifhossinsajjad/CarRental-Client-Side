import React from "react";
import { FaCalendarCheck, FaCar, FaClock, FaDollarSign, FaHeadset, FaShieldAlt, FaStar, FaUsers } from "react-icons/fa";


const RentCar = () => {
  const benefits = [
    {
      icon: FaCalendarCheck,
      title: "Easy & Quick Booking",
      description:
        "Book your perfect car in just a few clicks. Our streamlined process gets you on the road faster.",
      features: [
        "3-step booking process",
        "Instant confirmation",
        "Digital paperwork",
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: FaDollarSign,
      title: "Affordable Rates",
      description:
        "Competitive pricing with no hidden fees. Get the best value for your money without compromising quality.",
      features: [
        "No hidden charges",
        "Price match guarantee",
        "Flexible payment options",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: FaShieldAlt,
      title: "Trusted Providers",
      description:
        "All our vehicles are from verified providers with excellent maintenance records and insurance coverage.",
      features: [
        "Fully insured vehicles",
        "Regular maintenance",
        "Quality verified",
      ],
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support ready to assist you whenever you need help on your journey.",
      features: [
        "24/7 phone support",
        "Live chat available",
        "Roadside assistance",
      ],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  const stats = [
    { icon: FaUsers, number: "50K+", label: "Happy Customers" },
    { icon: FaCar, number: "2.5K+", label: "Quality Vehicles" },
    { icon: FaStar, number: "4.9/5", label: "Customer Rating" },
    { icon: FaClock, number: "24/7", label: "Support Available" },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-gray-100 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-700">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Rent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              With Us?
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our customer-first approach. We're
            committed to making your car rental experience seamless, affordable,
            and exceptional in every way.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-2xl text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div
                className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border ${benefit.borderColor} overflow-hidden group-hover:scale-105 h-full`}
              >
                <div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>

                <div className="p-6">
                  <div
                    className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <benefit.icon
                      className={`text-2xl bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {benefit.description}
                  </p>

                  <ul className="space-y-3">
                    {benefit.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.color}`}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full translate-y-12 -translate-x-12 opacity-20"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Start Your Journey?
              </h3>

              <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who trust us for their car
                rental needs. Experience the perfect blend of quality,
                affordability, and exceptional service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3">
                  <FaCar />
                  Browse Available Cars
                </button>

                <button className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-200 hover:shadow-xl flex items-center gap-3">
                  <FaHeadset />
                  Contact Support
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaShieldAlt className="text-green-500" />
                  <span>Secure Booking</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaDollarSign className="text-blue-500" />
                  <span>Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaStar className="text-amber-500" />
                  <span>Rated Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="text-3xl text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Fully Insured
            </h4>
            <p className="text-gray-600 text-sm">
              Comprehensive insurance coverage for complete peace of mind during
              your rental period.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaClock className="text-3xl text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Flexible Rental
            </h4>
            <p className="text-gray-600 text-sm">
              Choose from hourly, daily, or weekly rentals with easy extension
              options.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-3xl text-amber-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Local Experts
            </h4>
            <p className="text-gray-600 text-sm">
              Get personalized recommendations from our local car rental
              experts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentCar;
