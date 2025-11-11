import React, { useEffect, useState } from 'react';
import BrowseCarsCard from '../Components/BrowseCarsCard';

const LatestCars = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {latestCars.map((car) => (
            <BrowseCarsCard key={car._id} car={car} />
          ))}
        </div>
        </div>
    );
};

export default LatestCars;