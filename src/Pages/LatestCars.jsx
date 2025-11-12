import { useEffect, useState } from "react";
import { FaTh, FaTruck } from "react-icons/fa";
import BrowseCarsCard from "../Components/BrowseCarsCard";

const LatestCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/latest-cars")
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
      fetch("http://localhost:3000/latest-cars")
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
    fetch(`http://localhost:3000/search?search=${search}`)
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
    fetch("http://localhost:3000/latest-cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-26">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Discover Your Dream Car
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Explore our premium collection of latest vehicles with unbeatable
            prices and exceptional service
          </p>

          {/* Animated Search Bar */}
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
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
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

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-12"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-white"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-white"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-white"
            ></path>
          </svg>
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
