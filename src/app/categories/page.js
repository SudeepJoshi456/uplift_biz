"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Search } from "lucide-react"; // Import Lucide icons

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Black-Owned Businesses</h1>
        <p className="text-gray-400 text-center mb-6">Showing results for: {location}</p>

        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <div className="relative w-full">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., Huntsville, AL)"
              className="w-full px-4 py-2 pl-10 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {locationError && <p className="text-red-500 text-center">{locationError}</p>}

          <select
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            <Search size={20} /> Search
          </button>
        </div>

        <div className="mt-6 w-full max-w-3xl">
          {loading ? (
            <p className="text-gray-400 text-center">Loading businesses...</p>
          ) : businesses.length > 0 ? (
            <ul className="bg-gray-900/90 backdrop-blur-md rounded-md p-4 shadow-lg max-h-[500px] overflow-y-auto">
              {businesses.map((biz) => (
                <li
                  key={biz.id}
                  className="p-4 border-b border-gray-700 last:border-none hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <div className="flex gap-4 items-center">
                    {biz.image_url ? (
                      <img
                        src={biz.image_url}
                        alt={biz.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-lg font-semibold">{biz.name}</p>
                      <p className="text-sm text-gray-300">{biz.location?.address1}, {biz.location?.city}</p>
                      <p className="text-sm text-gray-400">⭐ {biz.rating} ({biz.review_count} reviews)</p>
                      <p className="text-sm text-gray-400">{biz.categories.map((c) => c.title).join(", ")}</p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/dir/${location}/${encodeURIComponent(
                        biz.location?.address1 + " " + biz.location?.city
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-300"
                    >
                      Get Directions
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center">No results found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
