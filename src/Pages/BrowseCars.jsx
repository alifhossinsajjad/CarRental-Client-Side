import { useEffect, useState } from "react";
import BrowseCarsCard from "../Components/BrowseCarsCard";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
  });

  useEffect(() => {
    fetch("https://car-re-ntal-server-side.vercel.app/cars")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        setCars(data);
        setFilteredCars(data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    let filtered = [...cars];

    if (filters.category !== "all") {
      filtered = filtered.filter((car) => car.carCategory === filters.category);
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((car) => car.status === filters.status);
    }

    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      status: "all",
    });
  };

  const categories = [...new Set(cars.map((car) => car.carCategory))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg">Loading amazing cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Your Perfect Ride
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our premium collection of {cars.length} vehicles for
            your next adventure
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Status</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
              Showing {filteredCars.length} of {cars.length} cars
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-outline btn-error"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">
              <Facar size={30} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Cars Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to find more options.
            </p>
            <button
              className="btn btn-primary mt-4"
              onClick={handleResetFilters}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <BrowseCarsCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
