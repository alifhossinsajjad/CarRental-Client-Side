import React, { useEffect, useState } from "react";
import Loading from "../Pages/Loding";
import BrowseCarsCard from "../Components/BrowseCarsCard";
const TopratedCar = () => {
  const [topRatedCars, setTopRatedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => {
        const filteredCars = data
          .filter((car) => car.rating >= 4.9)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6); //

        setTopRatedCars(filteredCars);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top rated cars:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {topRatedCars.map((car) => (
        <BrowseCarsCard key={car._id} car={car} />
      ))}
    </div>
  );
};

export default TopratedCar;
