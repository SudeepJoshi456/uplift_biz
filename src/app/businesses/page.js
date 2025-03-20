"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin } from "lucide-react"; // Import Lucide icon

export default function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState("blackowned");
  const [location, setLocation] = useState(""); // No default location
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  // Fetch user's current location and auto-search on first load
  useEffect(() => {
    const fetchLocationAndBusinesses = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // Convert coordinates to city, state or zip
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const formattedLocation = `${data.city}, ${data.principalSubdivisionCode}`;
            setLocation(formattedLocation);
            fetchBusinesses(formattedLocation); // Auto-search with formatted location
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

  // Function to fetch businesses based on the location and category
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
      <div className="container mx-auto p-6 bg-gray-700 min-h-screen">
        <h1 className="text-4xl font-bold text-white">Black-Owned Businesses</h1>

        {/* Location Info */}
        <p className="text-gray-400 mt-2">
          Showing results for: {location}
        </p>

        {/* Location Input */}
        <div className="mt-4">
          <label className="text-lg font-semibold text-gray-300 mr-2">Location:</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., Huntsville, AL or 35801)"
              className="px-4 py-2 pl-10 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          {locationError && <p className="text-red-500 mt-2">{locationError}</p>}
        </div>

        {/* Category Filter */}
        <div className="mt-4">
          <label className="text-lg font-semibold text-gray-300 mr-2">Filter by Category:</label>
          <select
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="blackowned">All</option>
            <option value="restaurants">Restaurants</option>
            <option value="beautysvc">Beauty & Spas</option>
            <option value="shopping">Retail</option>
            <option value="professional">Professional Services</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="mt-4">
          <button
            onClick={() => fetchBusinesses()}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Search
          </button>
        </div>

        {/* Business Listings */}
        <div className="mt-6">
          {loading ? (
            <p className="text-gray-500">Loading businesses...</p>
          ) : businesses.length > 0 ? (
            <div className="bg-gray-800/90 backdrop-blur-md rounded-md p-4 shadow-lg max-h-[500px] overflow-y-auto">
              {businesses.slice(0, 5).map((biz) => ( // Show only 5 results at a time
                <li
                  key={biz.id}
                  className="p-4 border-b border-gray-700 last:border-none hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <div className="flex gap-4">
                    {/* Business Image */}
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

                    {/* Business Info */}
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-white">{biz.name}</p>
                      <p className="text-sm text-gray-300">
                        {biz.location?.address1}, {biz.location?.city}
                      </p>
                      <p className="text-sm text-gray-400">
                        ⭐ {biz.rating} ({biz.review_count} reviews)
                      </p>
                      <p className="text-sm text-gray-400">
                        {biz.categories.map((c) => c.title).join(", ")}
                      </p>
                    </div>

                    {/* Get Directions Button */}
                    <div className="flex items-center">
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
                  </div>
                </li>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No results found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function Businesses() {
//   const [businesses, setBusinesses] = useState([]);
//   const [categories, setCategories] = useState("blackowned");
//   const [location, setLocation] = useState("Huntsville, AL"); // Default location
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBusinesses = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/yelp?categories=${categories}&location=${location}`);
//         const data = await res.json();
//         setBusinesses(data.businesses || []);
//       } catch (error) {
//         console.error("Error fetching businesses:", error);
//       }
//       setLoading(false);
//     };

//     fetchBusinesses();
//   }, [categories, location]);

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto p-6">
//         <h1 className="text-4xl font-bold text-googleBlue">Black-Owned Businesses</h1>

//         {/* Location Info */}
//         <p className="text-gray-500">Showing results for: {location}</p>

//         {/* Category Filter */}
//         <div className="mt-4">
//           <label className="text-lg font-semibold text-gray-700 mr-2">Filter by Category:</label>
//           <select
//             value={categories}
//             onChange={(e) => setCategories(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-googleBlue"
//           >
//             <option value="blackowned">All</option>
//             <option value="restaurants">Restaurants</option>
//             <option value="beautysvc">Beauty & Spas</option>
//             <option value="shopping">Retail</option>
//             <option value="professional">Professional Services</option>
//           </select>
//         </div>

//         {/* Business Listings */}
//         <div className="mt-6">
//           {loading ? (
//             <p className="text-gray-500">Loading businesses...</p>
//           ) : businesses.length > 0 ? (
//             <ul className="bg-gray-100 rounded-md p-4 shadow-md">
//               {businesses.map((biz) => (
//                 <li key={biz.id} className="p-4 border-b border-gray-300 last:border-none">
//                   <p className="text-lg font-semibold text-googleBlue">{biz.name}</p>
//                   <p className="text-sm text-gray-600">{biz.location?.address1}, {biz.location?.city}</p>
//                   <p className="text-sm text-gray-500">⭐ {biz.rating} ({biz.review_count} reviews)</p>
//                   <p className="text-sm text-gray-500">{biz.categories.map(c => c.title).join(", ")}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 mt-4">No results found.</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
