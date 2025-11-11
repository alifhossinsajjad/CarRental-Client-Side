import { Link } from "react-router";
import {
  FaStar,
  FaUser,
  FaHeart,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { TbCalendarCancel } from "react-icons/tb";

const BrowseCarsCard = ({ car }) => {
  const {
    _id,
    carId,
    carName,
    rentPricePerDay,
    carModel,
    providerName,
    carCategory,
    status,
    image,
    rating,
    Seats,
    Transmission,
  } = car;

  const getStatusColor = (status) => {
    return status === "Available"
      ? "bg-green-100 text-green-800 border border-green-200"
      : "bg-red-100 text-red-800 border border-red-200";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Sedan: "bg-blue-100 text-blue-800 border border-blue-200",
      Electric: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      SUV: "bg-orange-100 text-orange-800 border border-orange-200",
      Luxury: "bg-purple-100 text-purple-800 border border-purple-200",
      Hatchback: "bg-amber-100 text-amber-800 border border-amber-200",
    };
    return (
      colors[category] || "bg-gray-100 text-gray-800 border border-gray-200"
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={carName}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Status & Category Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getCategoryColor(
              carCategory
            )}`}
          >
            {carCategory}
          </span>
        </div>

        {/* Model Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
          {carModel}
        </div>
      </div>

      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {carName}
          </h3>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <FaUser className="text-gray-400" size={16} />
            {providerName}
          </p>
        </div>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              ${rentPricePerDay}
            </span>
            <span className="text-gray-500 text-sm">/ day</span>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
            <FaStar className="text-yellow-400" size={16} />
            <span className="text-gray-800 font-semibold text-sm">
              {rating}
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center text-gray-600 text-sm gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <LuBadgeCheck className="text-blue-500" size={18} />
            <span className="font-medium">{Transmission}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <MdAirlineSeatReclineNormal className="text-green-500" size={18} />
            <span className="font-medium">{Seats} Seats</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <TbCalendarCancel className="text-purple-500" size={18} />
            <span className="font-medium">Free Cancel</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <FaShieldAlt className="text-emerald-500" size={16} />
            <span className="font-medium">Insured</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 border-2 border-gray-300 hover:border-red-300 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-red-50 group">
            <FaHeart
              className="group-hover:scale-110 transition-transform duration-200"
              size={18}
            />
          </button>
        </div>

        {/* View Details Link */}
        <Link
          to={`/car-details/${carId || _id}`}
          className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group border border-gray-200 hover:border-blue-200 hover:bg-blue-50"
        >
          View Full Details
          <FaArrowRight
            className="group-hover:translate-x-1 transition-transform duration-200"
            size={14}
          />
        </Link>
      </div>
    </div>
  );
};

export default BrowseCarsCard;
