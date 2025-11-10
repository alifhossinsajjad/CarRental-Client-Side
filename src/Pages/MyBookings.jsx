import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Pages/Loding";
import BrowseCarsCard from "../Components/BrowseCarsCard";
import { motion } from "framer-motion";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBooking(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-indigo-600 drop-shadow-sm">
            My Bookings
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Explore all your car rentals — ready for your next adventure 
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-indigo-500 rounded-full shadow-md"></div>
        </motion.div>

        {/* Inspirational Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Every journey you book tells a story — of freedom, movement, and
            discovery. Let your travels inspire the road ahead.
          </p>
          <p className="mt-4 italic text-indigo-500 font-semibold">
            “Adventure is calling, and your wheels are waiting.”
          </p>
        </motion.div>

        {/* Bookings Grid */}
        {booking.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20"
          >
            <h2 className="text-2xl font-semibold text-gray-600">
              You haven’t booked any cars yet 
            </h2>
            <p className="text-gray-500 mt-2">
              Start your journey today — find the perfect car for your next
              destination.
            </p>
            <p className="mt-4 text-indigo-600 font-medium">
              It’s time to hit the road with style and comfort.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {booking.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BrowseCarsCard car={car} />
                </motion.div>
              ))}
            </motion.div>

            {/* Footer Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-center mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Keep Exploring the Road 
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your bookings reflect your journey and passion for travel.
                Continue exploring, discovering, and experiencing new
                destinations — one car ride at a time.
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
