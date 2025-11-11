import React, { useState, useEffect, use } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Pages/Loding";
import { motion } from "framer-motion";
import {
  FaStar,
  FaCalendarAlt,
  FaDollarSign,
  FaCar,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchBookings = () => {
    setLoading(true);
    fetch(`http://localhost:3000/my-bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Bookings data:", data);
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancelBooking = (bookingId, carId) => {
    console.log("Cancelling booking:", bookingId, "for car:", carId);
    
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCancellingId(bookingId);

        fetch(`http://localhost:3000/my-bookings/${carId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Cancel booking response:", data);
            if (data.deletedCount > 0 && data.carUpdated) {
              // Successfully cancelled and car status updated
              setBookings((prev) =>
                prev.filter((booking) => booking._id !== bookingId)
              );
              setCancellingId(null);
              toast.success("Booking cancelled successfully! Car is now available.");
            } else {
              setCancellingId(null);
              toast.error("Failed to cancel booking or update car status");
            }
          })
          .catch((error) => {
            console.error("Error cancelling booking:", error);
            setCancellingId(null);
            toast.error("Failed to cancel booking");
          });
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-indigo-600 drop-shadow-sm">
            My Bookings
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage and track all your car bookings in one place 📅
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-indigo-500 rounded-full shadow-md"></div>
        </motion.div>

        {/* Motivational Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Your upcoming adventures and travel plans are listed below. Get
            ready to hit the road and create unforgettable memories!
          </p>
          <p className="mt-4 italic text-indigo-500 font-semibold">
            "Adventure is worthwhile in itself." - Amelia Earhart
          </p>
        </motion.div>

        {/* Bookings Grid */}
        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20 bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg"
          >
            <div className="text-6xl mb-6"><FaCar size={40}/></div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No Bookings Yet
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              You haven't booked any cars yet. Start exploring available cars
              and book your first ride!
            </p>
            <Link
            to={'/browse-cars'}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Browse Available Cars
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="grid gap-6"
            >
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Car Image */}
                      <div className="lg:col-span-3">
                        <div className="relative rounded-xl overflow-hidden bg-gray-100 h-48">
                          <img
                            src={booking.image}
                            alt={booking.carName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-green-100 border border-green-200 text-green-700 px-3 py-1 rounded-lg font-medium text-sm">
                            Confirmed
                          </div>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {booking.carName}
                          </h3>
                          <p className="text-lg text-gray-600 mb-3">
                            {booking.carModel}
                          </p>

                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                              <FaStar className="text-yellow-500" size={16} />
                              <span className="font-semibold text-yellow-800">
                                {booking.rating}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <FaCar className="text-indigo-500" />
                              <span>{booking.Seats} Seats</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <span>🔄 {booking.Transmission}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <FaDollarSign
                              className="text-green-500"
                              size={20}
                            />
                            <div>
                              <p className="text-sm text-gray-600">
                                Total Price
                              </p>
                              <p className="text-xl font-bold text-gray-900">
                                ${booking.rentPricePerDay}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                            <FaCalendarAlt
                              className="text-purple-500"
                              size={20}
                            />
                            <div>
                              <p className="text-sm text-gray-600">Booked On</p>
                              <p className="font-semibold text-gray-900">
                                {formatDate(booking.bookingDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="lg:col-span-3 flex flex-col space-y-4">
                        <button
                          onClick={() =>
                            handleCancelBooking(booking._id, booking.carId)
                          }
                          disabled={cancellingId === booking._id}
                          className="w-full py-3 px-6 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center space-x-2"
                        >
                          {cancellingId === booking._id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Cancelling...</span>
                            </>
                          ) : (
                            <>
                              <FaTimes size={16} />
                              <span>Cancel Booking</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>Booking ID: {booking._id}</span>
                        <span>•</span>
                        <span>Car ID: {booking.carId}</span>
                      </div>
                      <div className="text-indigo-600 font-medium">
                        Ready for Pickup
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer Text Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-center mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Need Help with Your Bookings? 🌟
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                If you have any questions about your bookings or need to modify
                your plans, our support team is here to help 24/7. Your
                satisfaction is our priority!
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200">
                  Contact Support
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition duration-200">
                  FAQ
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;