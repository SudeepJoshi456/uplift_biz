"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch businesses from Yelp API based on user input
  const fetchBusinesses = async (searchLocation) => {
    if (!searchLocation) {
      setLocationError("Please enter a valid location.");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(`/api/yelp?location=${encodeURIComponent(searchLocation)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.businesses) {
        setResults(data.businesses);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching Yelp data:", error);
      setResults([]);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <h1 className="text-4xl font-bold text-googleBlue mt-10">
          Find Local Black & Minority-Owned Businesses
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Discover and support businesses in your community.
        </p>

        {/* Input field for manual location entry */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter ZIP code or City, State"
            className="border text-black rounded p-2"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <button
            className="ml-2 bg-blue-500 text-white p-2 rounded"
            onClick={() => fetchBusinesses(location)}
          >
            Search
          </button>
        </div>

        {/* Show error message if location is missing */}
        {locationError && <p className="text-red-500 mt-4">{locationError}</p>}

        {/* Results Section */}
        <div className="mt-8 w-full max-w-lg">
          {loading ? (
            <p className="text-gray-500">Loading results...</p>
          ) : results.length > 0 ? (
            <ul className="bg-gray-100 rounded-md p-4 shadow-md">
              {results.map((biz) => (
                <li key={biz.id} className="p-2 border-b border-gray-300 last:border-none">
                  <p className="text-lg font-semibold text-googleBlue">{biz.name}</p>
                  <p className="text-sm text-gray-600">
                    {biz.location.address1}, {biz.location.city}
                  </p>
                  <p className="text-sm text-gray-500">
                    ⭐ {biz.rating} ({biz.review_count} reviews)
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">No results found. Try a different location.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
