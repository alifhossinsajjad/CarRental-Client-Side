import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Pages/Loding";
import BrowseCarsCard from "../Components/BrowseCarsCard";
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
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {booking.map((car) => (
          <BrowseCarsCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
