import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Pages/Loding";
import BrowseCarsCard from "../Components/BrowseCarsCard";
import { FaEdit, FaTrash, FaCar, FaPlus, FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyListing = () => {
  const { user } = use(AuthContext);
  const [listCar, setListCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchMyListings();
  }, [user]);

  const fetchMyListings = () => {
    setLoading(true);
    fetch(`http://localhost:3000/my-listing?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setListCar(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
        setLoading(false);
      });
  };

  // Delete Car Function
  const handleDeleteCar = (carId) => {
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
        fetch(`http://localhost:3000/cars/${carId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount > 0) {
              setListCar(prev => prev.filter(car => car._id !== carId));
              Swal.fire({
                title: "Deleted!",
                text: "Your car has been deleted.",
                icon: "success",
              });
              toast.success("Car deleted successfully!");
            } else {
              toast.error("Failed to delete car");
            }
          })
          .catch((error) => {
            console.error("Error deleting car:", error);
            toast.error("Failed to delete car");
          });
      }
    });
  };

  // Update Car Function
  const handleUpdateCar = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    fetch(`http://localhost:3000/cars/${updateData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setListCar(prev => 
            prev.map(car => 
              car._id === updateData._id ? updateData : car
            )
          );
          setShowUpdateForm(false);
          setUpdateData(null);

          Swal.fire({
            title: "Success!",
            text: "Car details updated successfully!",
            icon: "success",
            confirmButtonColor: "#2563eb",
            confirmButtonText: "Great!",
            timer: 3000,
            timerProgressBar: true,
          });
          toast.success("Car updated successfully!");
        } else {
          toast.error("Failed to update car");
        }
        setIsUpdating(false);
      })
      .catch((error) => {
        console.log("Error updating car:", error);
        toast.error("Failed to update car");
        setIsUpdating(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const openUpdateForm = (car) => {
    setUpdateData(car);
    setShowUpdateForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Loading />
      </div>
    );
  }

  // Calculate stats
  const totalCars = listCar.length;
 
  const totalEarnings = listCar.reduce((sum, car) => sum + (car.rentPricePerDay || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      {/* Background Decorations */}
      <div className="fixed top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-gray-100 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Active Listings</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            My Car <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Listings</span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your car collection and connect with travelers worldwide
          </p>
        </div>

        {/* Stats Overview */}
        {listCar.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaCar className="text-2xl text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{totalCars}</div>
                  <div className="text-sm text-gray-600">Total Cars</div>
                </div>
              </div>
            </div>

            

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FaDollarSign className="text-2xl text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">${totalEarnings}</div>
                  <div className="text-sm text-gray-600">Daily Potential</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {listCar.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <FaCar className="text-5xl text-blue-500" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                No Cars Listed Yet
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Start your car sharing journey today. List your first car and begin earning from your vehicle.
              </p>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaPlus className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Why list your car?</h3>
                </div>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Earn extra income from your idle vehicle
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Connect with travelers worldwide
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Full insurance coverage provided
                  </li>
                </ul>
              </div>

              <Link to={'/add-car'} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto">
                <FaPlus />
                Add Your First Car
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {listCar.map((car) => (
                <div key={car._id} className="group relative">
                  {/* Action Buttons */}
                  <div className="absolute top-36 right-4 z-20 flex gap-2">
                    <button
                      onClick={() => openUpdateForm(car)}
                      className="bg-white/90 backdrop-blur-sm text-blue-600 p-3 rounded-xl hover:bg-white hover:text-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      title="Edit Car"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      className="bg-white/90 backdrop-blur-sm text-red-600 p-3 rounded-xl hover:bg-white hover:text-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      title="Delete Car"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>

                

                  {/* Card Container */}
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group-hover:scale-105">
                    <BrowseCarsCard car={car} />
                  </div>
                </div>
              ))}
            </div>

            {/* Success Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <FaChartLine className="text-3xl text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Your Listings Are Live! 🎉
                  </h3>
                  <p className="text-gray-600">
                    Your cars are now visible to thousands of potential renters. 
                    Keep your listings updated for better visibility and more bookings.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Quick Tips Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Pro Tips for Better Listings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaEdit className="text-xl text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Update Regularly</h4>
              <p className="text-gray-600 text-sm">
                Keep your car details and photos current to attract more renters
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaDollarSign className="text-xl text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Competitive Pricing</h4>
              <p className="text-gray-600 text-sm">
                Set fair prices based on market rates and car features
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-xl text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quick Responses</h4>
              <p className="text-gray-600 text-sm">
                Respond promptly to booking requests for better conversion
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Car Form Modal */}
      {showUpdateForm && updateData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-3xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Update Car Details
                  </h2>
                  <p className="text-gray-600 mt-1">Edit your car information</p>
                </div>
                <button
                  onClick={() => {
                    setShowUpdateForm(false);
                    setUpdateData(null);
                  }}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-2xl font-bold text-gray-500">×</span>
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleUpdateCar} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Car Name", name: "carName", type: "text" },
                  { label: "Car Model", name: "carModel", type: "text" },
                  { label: "Price Per Day ($)", name: "rentPricePerDay", type: "number" },
                  { label: "Category", name: "carCategory", type: "text" },
                  { label: "Seats", name: "Seats", type: "number" },
                  { label: "Transmission", name: "Transmission", type: "text" },
                  { label: "Climate", name: "Climate", type: "text" },
                  { label: "Rating", name: "rating", type: "number", step: "0.1" },
                  { label: "Image URL", name: "image", type: "url", colSpan: "md:col-span-2" },
                ].map((field, index) => (
                  <div key={index} className={field.colSpan || ""}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={updateData[field.name] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                      step={field.step}
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={updateData.description || ""}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Describe your car's features and condition..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Features (comma separated)
                  </label>
                  <textarea
                    name="features"
                    value={updateData.features ? updateData.features.join(", ") : ""}
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="GPS, Bluetooth, Sunroof, Leather Seats, ..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateForm(false);
                    setUpdateData(null);
                  }}
                  className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isUpdating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

export default MyListing;