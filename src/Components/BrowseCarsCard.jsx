import React from "react";
import { Link } from "react-router";

const BrowseCarsCard = ({ car }) => {
  const {
    _id,
    carName,
    rentPricePerDay,
    carModel,
    providerName,
    carCategory,
    status,
    image,
    rating,
  } = car;

  const getStatusColor = (status) => {
    return status === "Available"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Sedan: "bg-blue-100 text-blue-800",
      Electric: "bg-emerald-100 text-emerald-800",
      SUV: "bg-orange-100 text-orange-800",
      Luxury: "bg-purple-100 text-purple-800",
      Hatchback: "bg-amber-100 text-amber-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={carName}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
              carCategory
            )}`}
          >
            {carCategory}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {carModel}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Car Name and Provider */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
            {carName}
          </h3>
          <p className="text-gray-600 text-sm flex items-center gap-1">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4m0 4h4m-4 0h4"
              />
            </svg>
            {providerName}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              ${rentPricePerDay}
            </span>
            <span className="text-gray-600 text-sm ml-1">/ day</span>
          </div>
          <div className="text-right">
            <div className="flex items-center text-yellow-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-gray-700 font-semibold ml-1">{rating}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Automatic
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            5 Seats
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Free Cancel
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Insured
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="w-12 h-12 border-2 border-gray-300 hover:border-primary text-gray-600 hover:text-primary rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-primary hover:bg-opacity-5">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* View Details Button */}
        <Link
          to={`/car-details/${_id}`}
          className="w-full mt-3 text-primary hover:text-primary-dark font-medium py-2 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group cursor-pointer"
        >
          View Details
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BrowseCarsCard;
