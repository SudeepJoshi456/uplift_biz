'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Search } from "lucide-react";

export default function Categories() {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    const fetchLocationAndBusinesses = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const formattedLocation = `${data.city}, ${data.principalSubdivisionCode}`;
            setLocation(formattedLocation);
            fetchBusinesses(formattedLocation);
          },
          () => {
            setLocationError("Location access denied. Enter location manually.");
          }
        );
      } else {
        setLocationError("Geolocation not supported. Enter location manually.");
      }
    };
    fetchLocationAndBusinesses();
  }, []);

  const fetchBusinesses = async (locationQuery = location) => {
    if (!locationQuery) {
      setLocationError("Please enter a location.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/yelp?categories=${categories}&location=${locationQuery}`);
      const data = await res.json();
      setBusinesses(data.businesses || []);
    } catch (error) {
      console.error("Error fetching businesses:", error);
      setBusinesses([]);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fddede' }}>
        <div className="rounded-2xl shadow-xl flex flex-col max-w-4xl p-6 w-full bg-[#fff5f7]">
          <h1 className="text-3xl font-bold mb-4 text-center text-black">Search by Category</h1>
          <p className="text-gray-600 text-center mb-4">Showing results for: {location}</p>

          {locationError && (
            <p className="text-red-500 text-center mb-4">{locationError}</p>
          )}

          <div className="space-y-4 mb-6 max-w-md mx-auto w-full">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location (e.g., Huntsville, AL)"
                className="border w-full p-2 pl-10 rounded text-black placeholder-gray-500"
              />
            </div>

            <select
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              className="border w-full p-2 rounded text-black"
            >
              <option value="businesses">All Categories</option>
              <option value="restaurants">Restaurants</option>
              <option value="haircut">Haircut</option>
              <option value="shopping">Retail</option>
              <option value="grocery">Grocery Stores</option>
              <option value="professional">Professional Services</option>
              <option value="other">Other</option>
            </select>

            <button
              onClick={() => fetchBusinesses()}
              className="bg-[#520606] text-white px-4 py-2 rounded w-full flex justify-center items-center gap-2"
            >
              <Search size={20} /> Search
            </button>
          </div>

          <div className="w-full max-w-3xl mx-auto">
            {loading ? (
              <p className="text-gray-600 text-center">Loading businesses...</p>
            ) : businesses.length > 0 ? (
              <ul className="bg-white/30 backdrop-blur-md rounded-md p-4 shadow-lg max-h-[500px] overflow-y-auto">
                {businesses.map((biz) => (
                  <li
                    key={biz.id}
                    className="p-4 border-b border-gray-300 last:border-none hover:bg-white/20 transition-colors duration-300 flex flex-col sm:flex-row gap-3"
                  >
                    <div className="flex-shrink-0">
                      {biz.image_url ? (
                        <img
                          src={biz.image_url}
                          alt={biz.name}
                          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-300 rounded-md flex items-center justify-center">
                          <span className="text-gray-500 text-sm">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-black">{biz.name}</p>
                      <p className="text-sm text-gray-700">
                        {biz.location?.address1}, {biz.location?.city}
                      </p>
                      <p className="text-sm text-gray-600">⭐ {biz.rating} ({biz.review_count} reviews)</p>
                      <p className="text-sm text-gray-600">{biz.categories.map((c) => c.title).join(", ")}</p>
                    </div>
                    <div className="flex items-center justify-end sm:justify-center">
                      <a
                        href={`https://www.google.com/maps/dir/${location}/${encodeURIComponent(
                          biz.location?.address1 + " " + biz.location?.city
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#520606] text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-300"
                      >
                        Get Directions
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">No results found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
