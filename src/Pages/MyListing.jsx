import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Pages/Loding";
import BrowseCarsCard from "../Components/BrowseCarsCard";
import { motion } from "framer-motion";

const MyListing = () => {
  const { user } = use(AuthContext);
  const [listCar, setListCar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-listing?email=${user.email}`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setListCar(data);
        setLoading(false);
      });
    });
  }, [user]);

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
            My Car Listings
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage, showcase, and celebrate your car collection in style 🚘
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
            Every car you list brings someone closer to their next adventure. 
            Whether it’s a city ride or a cross-country journey, your listings make travel easier for everyone.
          </p>
          <p className="mt-4 italic text-indigo-500 font-semibold">
            “Great journeys start with one key — yours.”
          </p>
        </motion.div>

        {/* Listing Grid */}
        {listCar.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20"
          >
            <h2 className="text-2xl font-semibold text-gray-600">
              You haven’t listed any cars yet 🚗
            </h2>
            <p className="text-gray-500 mt-2">
              Add your first car and become part of a growing car-sharing community.
            </p>
            <p className="mt-4 text-indigo-600 font-medium">
              Your next earning opportunity is just one click away!
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
              {listCar.map((car, index) => (
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

            {/* Footer Text Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-center mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Keep Growing Your Fleet 🌟
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The more cars you list, the more chances you have to earn, 
                connect, and make a difference in someone’s travel story. 
                Let your passion for driving inspire others to move freely!
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyListing;
