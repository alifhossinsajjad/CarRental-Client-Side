import React, { useState, useEffect, use } from "react";

import Loding from "./Loding";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  const { id } = useParams();
  const naviagte = useNavigate();
  const { user } = use(AuthContext);

  // Fetch car details
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCar(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching car:", error);
        setLoading(false);
      });
  }, []);

  console.log(car);

  //car book
  const handleBookCar = () => {
    if (!car || car.status === "booked") return;

    setIsBooking(true);

    const bookingData = {
      carId: car._id,
      carName: car.carName,
      carModel: car.carModel,
      image: car.image,
      rentPricePerDay: car.rentPricePerDay,
      booked_by: user.email,
      rating: car.rating,
      Seats: car.Seats,
      Transmission: car.Transmission,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
    };

    console.log("car data", bookingData);

    fetch(`http://localhost:3000/my-bookings/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("car booking done:", result);

        if (result) {
          setCar({
            ...car,
            status: "booked",
          });
          toast.success("Car booked successfully!");
          naviagte("/browse-cars");
        } else {
          toast.error("Failed to book car");
        }
        setIsBooking(false);
      })
      .catch((error) => {
        console.log("Error booking car:", error);
        toast.error("Failed to book car");
        setIsBooking(false);
      });
  };

 

  if (loading) {
    return <Loding />;
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Car Not Found
          </h2>
          <p className="text-gray-600">
            The car you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Car Details</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Image and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Car Image */}
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={car.image}
                  alt={car.carName}
                  className="w-full h-80 object-cover"
                />
                {/* Fixed Status Badge - Now shows both available and booked with proper colors */}
                <div
                  className={`absolute top-4 right-4 px-4 py-2 rounded-lg font-medium text-sm border ${
                    car.status === "available"
                      ? "bg-green-100 border-green-200 text-green-700"
                      : "bg-red-100 border-red-200 text-red-700"
                  }`}
                >
                  {car.status === "available" ? "Available" : "Booked"}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-lg  text-blue-600">{car.Seats}</div>
                  <div className="text-sm text-blue-800 font-bold">Seats</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-sm  text-green-600">
                    {car.Transmission}
                  </div>
                  <div className="text-lg text-green-800 font-bold">
                    Transmission
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="text-sm  text-purple-600">{car.Climate}</div>
                  <div className="text-lg text-purple-800 font-bold">
                    Climate
                  </div>
                </div>
              </div>
            </div>

            {/* Car Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      {car.carName}
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                      {car.carModel}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                    <span className="text-yellow-600">
                      <FaStar size={20} />
                    </span>
                    <span className="font-semibold text-yellow-800">
                      {car.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline space-x-2 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ${car.rentPricePerDay}
                  </span>
                  <span className="text-gray-500">/ day</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleBookCar}
                  disabled={car.status === "booked" || isBooking}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                    car.status === "booked"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isBooking
                    ? "Booking..."
                    : car.status === "booked"
                    ? "Already Booked"
                    : "Book This Car"}
                </button>

                
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900">
                      {car.carCategory}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    {/* Fixed Status Display - Now with background colors */}
                    <span
                      className={`font-medium px-2 py-1 rounded ${
                        car.status === "available"
                          ? "text-green-700 bg-green-100"
                          : "text-red-700 bg-red-100"
                      }`}
                    >
                      {car.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-8 py-8">
            <div className="max-w-4xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Vehicle Description
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {car.description}
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="border-t border-gray-200 px-8 py-8 bg-gray-50">
            <div className="max-w-4xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Premium Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {car.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
                  Specifications
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Fuel Type", value: "Petrol" },
                    { label: "Engine", value: "2.0L Turbo" },
                    { label: "Transmission", value: "Automatic" },
                    { label: "Drive Type", value: "Front Wheel" },
                    { label: "Horsepower", value: "189 HP" },
                    { label: "Fuel Economy", value: "28 MPG" },
                  ].map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-gray-100"
                    >
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
                  Provider Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Provider</span>
                    <span className="font-medium text-gray-900">
                      {car.providerName}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Added By</span>
                    <span className="font-medium text-gray-900">
                      {car.created_by}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Listed On</span>
                    <span className="font-medium text-gray-900">
                      {new Date(car.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
                  Safety & Comfort
                </h3>
                <div className="space-y-3">
                  {[
                    "ABS Brakes",
                    "Stability Control",
                    "Multiple Airbags",
                    "Rear View Camera",
                    "Cruise Control",
                    "Keyless Entry",
                    "Automatic Climate Control",
                    "Rain Sensing Wipers",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CarDetails;
