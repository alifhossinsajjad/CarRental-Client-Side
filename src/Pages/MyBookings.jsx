import { use, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCar,
  FaDollarSign,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Pages/Loding";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://car-re-ntal-server-side.vercel.app/my-bookings?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("Bookings data:", data);
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, [user]);

  const handleCancelBooking = (bookingId, carId) => {
    // console.log("Cancelling booking:", bookingId, "for car:", carId);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      background: "#ffffff",
      color: "#333333",
    }).then((result) => {
      if (result.isConfirmed) {
        setCancellingId(bookingId);

        fetch(
          `https://car-re-ntal-server-side.vercel.app/my-bookings/${carId}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log("Cancel booking response:", data);
            if (data.deletedCount > 0 && data.carUpdated) {
              setBookings((prev) =>
                prev.filter((booking) => booking._id !== bookingId)
              );
              setCancellingId(null);
              toast.success(
                "Booking cancelled successfully! Car is now Available."
              );
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

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <FaCalendarAlt className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            My Bookings
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage and track all your car bookings in one place
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaCar className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings.length}
                  </p>
                  <p className="text-gray-600">Total Bookings</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaDollarSign className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    $
                    {bookings.reduce(
                      (total, booking) =>
                        total + parseFloat(booking.rentPricePerDay),
                      0
                    )}
                  </p>
                  <p className="text-gray-600">Total Value</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FaStar className="text-purple-600 text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings.length > 0
                      ? (
                          bookings.reduce(
                            (sum, booking) => sum + parseFloat(booking.rating),
                            0
                          ) / bookings.length
                        ).toFixed(1)
                      : "0.0"}
                  </p>
                  <p className="text-gray-600">Avg. Rating</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCar className="text-indigo-500 text-4xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                No Bookings Yet
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                You haven't booked any cars yet. Start exploring our premium
                collection and book your first ride!
              </p>
              <Link
                to="/browse-cars"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaCar className="text-lg" />
                Browse Available Cars
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6 lg:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Car Image & Quick Info */}
                    <div className="lg:col-span-4">
                      <div className="relative rounded-xl overflow-hidden bg-gray-100 h-48 lg:h-64">
                        <img
                          src={booking.image}
                          alt={booking.carName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          Confirmed
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900 shadow-lg flex items-center gap-1">
                          <FaStar className="text-yellow-500" />
                          <span>{booking.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">
                            {booking.Seats}
                          </div>
                          <div className="text-xs text-blue-800 font-medium">
                            Seats
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-sm font-bold text-green-600">
                            {booking.Transmission}
                          </div>
                          <div className="text-xs text-green-800 font-medium">
                            Transmission
                          </div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">
                            ${booking.rentPricePerDay}
                          </div>
                          <div className="text-xs text-purple-800 font-medium">
                            Per Day
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="lg:col-span-5">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                            {booking.carName}
                          </h3>
                          <p className="text-lg text-gray-600 font-medium mb-4">
                            {booking.carModel}
                          </p>

                          <div className="flex flex-wrap gap-3 mb-4">
                            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                              <FaStar className="text-yellow-500" />
                              <span className="font-semibold text-yellow-800">
                                {booking.rating} Rating
                              </span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                              <FaCar className="text-blue-500" />
                              <span className="font-semibold text-blue-800">
                                {booking.Seats} Seats
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <FaCalendarAlt className="text-purple-500 text-lg" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Booked On
                                </p>
                                <p className="font-semibold text-gray-900">
                                  {formatDate(booking.bookingDate)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <FaDollarSign className="text-green-500 text-lg" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Total Price
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  ${booking.rentPricePerDay}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="lg:col-span-3">
                      <div className="space-y-4">
                        <button
                          onClick={() =>
                            handleCancelBooking(booking._id, booking.carId)
                          }
                          disabled={cancellingId === booking._id}
                          className="w-full py-4 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          {cancellingId === booking._id ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Cancelling...</span>
                            </>
                          ) : (
                            <>
                              <FaTimes size={18} />
                              <span>Cancel Booking</span>
                            </>
                          )}
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                          <button className="py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                            <FaPhone className="text-green-500" />
                            <span>Call</span>
                          </button>
                          <button className="py-3 px-4 bg-white border border-indigo-300 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2">
                            <FaMapMarkerAlt className="text-indigo-500" />
                            <span>Directions</span>
                          </button>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <FaHeadset className="text-blue-500 text-lg" />
                            <div>
                              <p className="text-sm font-semibold text-blue-800">
                                Need Help?
                              </p>
                              <p className="text-xs text-blue-600">
                                Contact support 24/7
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 px-6 lg:px-8 py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        Booking ID:{" "}
                        <span className="font-mono font-semibold">
                          {booking._id}
                        </span>
                      </span>
                      <span className="hidden sm:block">•</span>
                      <span>
                        Car ID:{" "}
                        <span className="font-mono font-semibold">
                          {booking.carId}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Ready for Pickup
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Support Section */}
        {bookings.length > 0 && (
          <div className="mt-16">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center">
              <div className="max-w-2xl mx-auto">
                <FaHeadset className="text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">
                  Need Help with Your Bookings?
                </h3>
                <p className="text-indigo-100 text-lg mb-6">
                  Our support team is Available 24/7 to assist you with any
                  questions or modifications to your bookings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300">
                    Contact Support
                  </button>
                  <button className="bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-800 transition-all duration-300">
                    View FAQ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
