import React, { useState, useEffect } from "react";

import Loding from "./Loding";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const { id } = useParams();
  const naviagte = useNavigate();
  // Fetch car details
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setUpdateData(data);
        // Navigate("/car-details");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching car:", error);
        setLoading(false);
      });
  }, [id]);

  // Book car function
  //   const handleBookCar = () => {
  //     if (!car || car.status === "booked") return;

  //     setIsBooking(true);

  //     const updatedCar = {
  //       ...car,
  //       status: "booked",
  //     };

  //     fetch(`http://localhost:3000/cars/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedCar),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         if (result.modifiedCount > 0) {
  //           setCar(updatedCar);
  //           alert("Car booked successfully!");
  //         }
  //         setIsBooking(false);
  //       })
  //       .catch((error) => {
  //         console.log("Error booking car:", error);
  //         alert("Failed to book car");
  //         setIsBooking(false);
  //       });
  //   };

  // Update car function
  const handleUpdateCar = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    fetch(`http://localhost:3000/cars/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setCar(updateData);
          setShowUpdateForm(false);

          Swal.fire({
            title: "Success!",
            text: "Car details updated successfully!",
            icon: "success",
            confirmButtonColor: "#2563eb",
            confirmButtonText: "Great!",
            timer: 3000,
            timerProgressBar: true,
          });
        }
        setIsUpdating(false);
      })
      .catch((error) => {
        console.log("Error updating car:", error);
        toast.error("Failed to update car");
        setIsUpdating(false);
      });
  };

  // Delete car function
  const handleDeleteCar = () => {
    console.log("yes delete");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/cars/${id}`, {
          method: "DELETE",
          body: JSON.stringify(result),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            naviagte("/browse-cars");
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // Handle input changes in update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
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
                {car.status === "booked" && (
                  <div className="absolute top-4 right-4 bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-lg font-medium text-sm">
                    Booked
                  </div>
                )}
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

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  //   onClick={handleBookCar}
                  disabled={car.status === "booked" || isBooking}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                    car.status === "booked"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                  } ${isBooking ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isBooking ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : car.status === "booked" ? (
                    "Already Booked"
                  ) : (
                    "Book This Car"
                  )}
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowUpdateForm(true)}
                    className="py-3 px-6 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                  >
                    Update Details
                  </button>

                  <button
                    onClick={handleDeleteCar}
                    className="py-3 px-6 bg-white border border-red-300 text-red-700 rounded-xl font-semibold hover:bg-red-50 active:bg-red-100 transition-all duration-200"
                  >
                    Delete Car
                  </button>
                </div>
              </div>

              {/* Quick Info */}
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
                    <span
                      className={`font-medium ${
                        car.status === "available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {car.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
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

          {/* Details Sections */}
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Car Specifications */}
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

              {/* Provider Information */}
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

              {/* Safety & Additional Features */}
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

      {/* Update Form Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Update Car Details
                </h2>
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition duration-200"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateCar} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Car Name", name: "carName", type: "text" },
                  { label: "Car Model", name: "carModel", type: "text" },
                  {
                    label: "Price Per Day ($)",
                    name: "rentPricePerDay",
                    type: "number",
                  },
                  { label: "Category", name: "carCategory", type: "text" },
                  {
                    label: "Image URL",
                    name: "image",
                    type: "url",
                    colSpan: "md:col-span-2",
                  },
                ].map((field, index) => (
                  <div key={index} className={field.colSpan || ""}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={updateData[field.name] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      required
                    />
                  </div>
                ))}

                {/* Description Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={updateData.description || ""}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Enter detailed car description..."
                  />
                </div>

                {/* Features Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (comma separated)
                  </label>
                  <textarea
                    name="features"
                    value={
                      updateData.features ? updateData.features.join(", ") : ""
                    }
                    onChange={(e) => {
                      const featuresArray = e.target.value
                        .split(",")
                        .map((feature) => feature.trim())
                        .filter((feature) => feature);
                      setUpdateData({
                        ...updateData,
                        features: featuresArray,
                      });
                    }}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Circular Display, Driving Modes, Customizable Ambient Lighting, ..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                  {isUpdating ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
