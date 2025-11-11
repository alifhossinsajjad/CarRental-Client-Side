import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Carosul from "./Carosul";
import BrowseCarsCard from "../Components/BrowseCarsCard";
import TopratedCar from "./TopratedCar";

const Home = () => {
  const [latestCars, setLatestCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/latest-cars")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLatestCars(data);
      });
  }, []);

  return (
    <div>
      {/* carosul section */}
      <section>
        <div>
          <Carosul />
        </div>
      </section>

      {/* latest car section */}
      <section className="my-20">
        <h1 className="text-center">latest cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {latestCars.map((car) => (
            <BrowseCarsCard key={car._id} car={car} />
          ))}
        </div>
      </section>

      {/* top rated cars */}
      <section>
        <h1 className="text-center">top rated cars</h1>
        <div>
          <TopratedCar />
        </div>
      </section>
    </div>
  );
};

export default Home;
