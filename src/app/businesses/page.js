"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState("blackowned");
  const [location, setLocation] = useState("Huntsville, AL"); // Default location
  const [loading, setLoading] = useState(false);

  // Function to fetch businesses based on the location and category
  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/yelp?categories=${categories}&location=${location}`);
      const data = await res.json();
      setBusinesses(data.businesses || []);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
    setLoading(false);
  };

  // Trigger fetching businesses when category or location changes
  useEffect(() => {
    fetchBusinesses();
  }, [categories, location]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-googleBlue">Black-Owned Businesses</h1>

        {/* Location Info */}
        <p className="text-gray-500">Showing results for: {location}</p>

        {/* Location Input */}
        <div className="mt-4">
          <label className="text-lg font-semibold text-gray-700 mr-2">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // Update location value
            placeholder="Enter location (e.g., Huntsville, AL)"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-googleBlue w-64"
          />
        </div>

        {/* Category Filter */}
        <div className="mt-4">
          <label className="text-lg font-semibold text-gray-700 mr-2">Filter by Category:</label>
          <select
            value={categories}
            onChange={(e) => setCategories(e.target.value)} // Update category value
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-googleBlue"
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
            onClick={fetchBusinesses}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Search
          </button>
        </div>

        {/* Business Listings */}
        <div className="mt-6">
          {loading ? (
            <p className="text-gray-500">Loading businesses...</p>
          ) : businesses.length > 0 ? (
            <ul className="bg-gray-100 rounded-md p-4 shadow-md">
              {businesses.map((biz) => (
                <li key={biz.id} className="p-4 border-b border-gray-300 last:border-none">
                  <p className="text-lg font-semibold text-googleBlue">{biz.name}</p>
                  <p className="text-sm text-gray-600">
                    {biz.location?.address1}, {biz.location?.city}
                  </p>
                  <p className="text-sm text-gray-500">
                    ⭐ {biz.rating} ({biz.review_count} reviews)
                  </p>
                  <p className="text-sm text-gray-500">
                    {biz.categories.map((c) => c.title).join(", ")}
                  </p>
                </li>
              ))}
            </ul>
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
