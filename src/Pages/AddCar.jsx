import React, { useState, useContext } from "react";
import {
  FaCar,
  FaMoneyBillWave,
  FaUser,
  FaCalendarAlt,
  FaImage,
  FaList,
  FaCog,
  FaUsers,
  FaSnowflake,
  FaPlus,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const AddCarModal = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(4.5); // Default rating

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to add a car");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    const formData = {
      carName: e.target.carName.value,
      rentPricePerDay: Number(e.target.rentPricePerDay.value),
      carModel: e.target.carModel.value,
      providerName: e.target.providerName.value,
      carCategory: e.target.carCategory.value,
      image: e.target.image.value,
      description: e.target.description.value,
      features: e.target.features.value
        .split(",")
        .map((feature) => feature.trim())
        .filter((feature) => feature),
      Seats: Number(e.target.seats.value),
      Transmission: e.target.transmission.value,
      Climate: e.target.climate.value,
      rating: rating,
      status: "Available",
      created_at: new Date().toISOString(),
      created_by: user.email || "user",
    };

    console.log("Submitting car data:", formData);

    const response = await fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("car data", data);

    if (data.success) {
      toast.success("Car added successfully!");
      navigate("/browse-cars");
    } else {
      toast.error(data.message || "Failed to add car");
    }
  };

  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="flex items-center gap-2">
        {[2, 3, 4, 4.5, 4.6, 4.8, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl transition-all duration-200 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } hover:text-yellow-500 hover:scale-110`}
          >
            <FaStar />
          </button>
        ))}
        <span className="ml-2 text-lg font-semibold text-gray-700">
          {rating}
        </span>
      </div>
    );
  };

  const carCategories = ["Sedan", "SUV", "Hatchback", "Luxury", "Electric"];

  const transmissionOptions = [
    "Automatic",
    "Manual",
    "CVT",
    "Single-Speed Automatic",
    "Dual-Clutch",
  ];

  const climateOptions = [
    "Manual AC",
    "Automatic Climate Control",
    "Dual-Zone Climate Control",
    "Tri-Zone Climate Control",
    "Four-Zone Climate Control",
  ];

  const seatOptions = [2, 4, 5, 6, 7, 8];

  const modelYears = [
    2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
      <div className="card border border-gray-200 bg-base-100 w-full max-w-2xl mx-auto shadow-2xl rounded-2xl">
        <div className="card-body p-8 relative">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 text-white rounded-2xl">
                <FaCar size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Add New Car</h2>
            </div>
            <p className="text-gray-600">
              List your car for rental on RentWheels
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Car Name */}
            <div>
              <label className="label font-semibold text-lg flex items-center gap-2">
                <FaCar className="text-blue-600" />
                Car Name
              </label>
              <input
                type="text"
                name="carName"
                required
                className="input input-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none "
                placeholder="e.g., Tesla Model 3, Toyota Camry"
              />
            </div>

            {/* Price and Model Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rent Price */}
              <div>
                <label className="label font-semibold flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" />
                  Rent Price Per Day ($)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="rentPricePerDay"
                    required
                    min="1"
                    step="0.01"
                    className="input input-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none  pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Car Model Year */}
              <div>
                <label className="label font-semibold flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-600" />
                  Model Year
                </label>
                <select
                  name="carModel"
                  required
                  className="select select-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none "
                >
                  <option value="">Select Year</option>
                  {modelYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Provider Name */}
            <div>
              <label className="label font-semibold text-lg flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Provider Name
              </label>
              <input
                type="text"
                name="providerName"
                required
                className="input input-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none "
                placeholder="e.g., EcoMotion Rentals, CityDrive Rentals"
              />
            </div>

            {/* Car Category */}
            <div>
              <label className="label font-semibold text-lg flex items-center gap-2">
                <FaList className="text-orange-600" />
                Car Category
              </label>
              <select
                name="carCategory"
                required
                className="select select-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none "
              >
                <option value="">Select Category</option>
                {carCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="label font-semibold text-lg flex items-center gap-2">
                <FaImage className="text-pink-600" />
                Car Image URL
              </label>
              <input
                type="url"
                name="image"
                required
                className="input input-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none "
                placeholder="https://example.com/car-image.jpg"
              />
            </div>

            {/* Rating Field - NEW */}
            <div>
              <label className="label font-semibold text-lg flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                Car Rating
              </label>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div className="flex flex-col gap-3">
                  <StarRating rating={rating} setRating={setRating} />
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      Select a rating from 1 to 5 stars
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="label font-semibold text-lg">Description</label>
              <textarea
                name="description"
                required
                rows="4"
                className="textarea textarea-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none"
                placeholder="Describe your car's features, condition, and special attributes..."
              ></textarea>
            </div>

            {/* Features */}
            <div>
              <label className="label font-semibold text-lg">Features</label>
              <textarea
                name="features"
                required
                rows="3"
                className="textarea textarea-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none"
                placeholder="Enter features separated by commas: Autopilot, Glass Roof, Premium Audio, etc."
              ></textarea>
              <div className="text-sm text-gray-500 mt-1">
                Separate features with commas
              </div>
            </div>

            {/* Specifications Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Seats */}
              <div>
                <label className="label font-semibold flex items-center gap-2">
                  <FaUsers className="text-blue-600" />
                  Number of Seats
                </label>
                <select
                  name="seats"
                  required
                  className="select select-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none "
                >
                  <option value="">Select Seats</option>
                  {seatOptions.map((seats) => (
                    <option key={seats} value={seats}>
                      {seats} Seats
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="label font-semibold flex items-center gap-2">
                  <FaCog className="text-blue-600" />
                  Transmission
                </label>
                <select
                  name="transmission"
                  required
                  className="select select-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none "
                >
                  <option value="">Select Transmission</option>
                  {transmissionOptions.map((transmission) => (
                    <option key={transmission} value={transmission}>
                      {transmission}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label font-semibold flex items-center gap-2">
                  <FaSnowflake className="text-blue-600" />
                  Climate Control
                </label>
                <select
                  name="climate"
                  required
                  className="select select-bordered w-full rounded-2xl focus:border-blue-500 focus:outline-none "
                >
                  <option value="">Select Climate</option>
                  {climateOptions.map((climate) => (
                    <option key={climate} value={climate}>
                      {climate}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn w-full text-white mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Adding Car...
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" />
                  Add Car to RentWheels
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarModal;
