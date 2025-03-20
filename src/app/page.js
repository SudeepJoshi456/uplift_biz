"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin } from "lucide-react"; // Import Lucide icons

export default function Home() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude},${longitude}`);
        },
        () => {
          setLocationError("Location access denied. Enter location manually.");
        }
      );
    } else {
      setLocationError("Geolocation not supported.");
    }
  }, []);

  const fetchBusinesses = async () => {
    if (!searchLocation || !searchQuery) return; // Require user-entered location

    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(`/api/yelp?location=${searchLocation}&term=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setResults(data.businesses || []);
    } catch (error) {
      console.error("Error fetching Yelp data:", error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-700">
        <h1 className="text-4xl font-bold text-white mt-10 text-center">
          Find Local Black & Minority-Owned Businesses
        </h1>
        <p className="text-lg text-gray-300 mt-2 text-center">
          Discover and support businesses in your community.
        </p>

        {locationError && <p className="text-red-500 mt-4">{locationError}</p>}

        {/* Search and Location Inputs */}
        <div className="mt-4 flex gap-2 items-center">
          {/* Search Input with Icon */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for restaurants, shops..."
              className="border border-gray-700 bg-gray-800 text-white rounded p-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>

          {/* Location Input with Icon */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter a location"
              className="border border-gray-700 bg-gray-800 text-white rounded p-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchLocation(e.target.value)}
              value={searchLocation}
              autoComplete="on"
            />
          </div>

          {/* Search Button */}
          <button
          className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center disabled:bg-gray-600/50 disabled:cursor-not-allowed relative group"
          onClick={fetchBusinesses}
          disabled={!searchQuery || !searchLocation}
        >
          <Search className="mr-2" size={18} /> Search
          {/* Tooltip for disabled state */}
          {(!searchQuery || !searchLocation) && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Please fill both fields
            </div>
          )}
        </button>
        </div>

        {/* Results Section */}
        <div className="mt-8 w-full max-w-lg">
          {loading ? (
            <p className="text-gray-500">Loading results...</p>
          ) : results.length > 0 ? (
            <div className="bg-gray-800/90 backdrop-blur-md rounded-md p-4 shadow-lg max-h-[500px] overflow-y-auto">
              {results.map((biz) => ( // Show only 5 results at a time
                <li
                  key={biz.id}
                  className="p-4 border-b border-gray-700 last:border-none flex gap-4 hover:bg-gray-700/50 transition-colors duration-300"
                >
                  {/* Cover Image */}
                  <div className="flex-shrink-0">
                    {biz.image_url ? (
                      <img
                        src={biz.image_url}
                        alt={biz.name}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Business Info */}
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-white">{biz.name}</p>
                    <p className="text-sm text-gray-300">
                      {biz.location.address1}, {biz.location.city}
                    </p>
                    <p className="text-sm text-gray-400">
                      ⭐ {biz.rating} ({biz.review_count} reviews)
                    </p>
                    <p className="text-gray-700">{biz.description || "No description available."}</p>
                  </div>

                  {/* Get Directions Button */}
                  <div className="flex items-center">
                    <a
                      href={`https://www.google.com/maps/dir/${currentLocation || searchLocation}/${encodeURIComponent(
                        biz.location.address1 + " " + biz.location.city
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-300"                    >
                      Get Directions
                    </a>
                  </div>
                </li>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No results found. Try a different search.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}