import { useEffect, useState } from "react";
import { FaTh, FaTruck } from "react-icons/fa";
import BrowseCarsCard from "../Components/BrowseCarsCard";

const LatestCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://car-re-ntal-server-side.vercel.app/latest-cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setSearchTerm(search);

    if (!search.trim()) {
      setLoading(true);
      fetch("https://car-re-ntal-server-side.vercel.app/latest-cars")
        .then((res) => res.json())
        .then((data) => {
          setCars(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
      return;
    }

    setLoading(true);
    fetch(`https://car-re-ntal-server-side.vercel.app/search?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const clearSearch = () => {
    setSearchTerm("");
    setLoading(true);
    fetch("https://car-re-ntal-server-side.vercel.app/latest-cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-36">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Discover Your Dream Car
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Explore our premium collection of latest vehicles with unbeatable
            prices and exceptional service
          </p>

          {/* Animated  Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-2xl transition-all duration-300 rounded-2xl"></div>
              <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl">
                <div className="flex-1 flex items-center">
                  <div className="pl-4 pr-3">
                    <svg
                      className="w-6 h-6 text-white/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    name="search"
                    type="search"
                    placeholder="Search by car name, model, or brand..."
                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/70 text-lg py-4"
                    defaultValue={searchTerm}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="px-3 text-white/70 hover:text-white transition-colors"
                    ></button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 disabled:opacity-50 transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Searching</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>Search</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 -mt-8 relative z-10">
        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20">
            <div className="flex items-center gap-2 text-blue-600">
              <FaTruck className="w-6 h-6" />
              <span className="text-2xl font-bold">{cars.length}</span>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              {searchTerm ? `Results for "${searchTerm}"` : "Latest Cars"}
            </h2>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-sm text-gray-600">
              {searchTerm ? "Search results" : "New arrivals"}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div
                  className="absolute inset-0 w-16 h-16 border-4 border-purple-600 border-b-transparent rounded-full animate-spin mx-auto mb-4"
                  style={{ animationDirection: "reverse" }}
                ></div>
              </div>
              <p className="text-gray-600 text-lg font-semibold">
                Loading amazing cars...
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && cars.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No cars found
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                {searchTerm
                  ? "We couldn't find any cars matching your search. Try different keywords!"
                  : "No cars available at the moment. Check back later for new arrivals!"}
              </p>
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View All Cars
                </button>
              )}
            </div>
          </div>
        )}

        {/* Cars Grid */}
        {!loading && cars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <BrowseCarsCard car={car} />
              </div>
            ))}
          </div>
        )}

        {/* Floating Action Button */}
        {!loading && cars.length > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={clearSearch}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
              title="Back to all cars"
            >
              <FaTh className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestCars;
