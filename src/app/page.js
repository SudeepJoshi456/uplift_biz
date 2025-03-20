"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <h1 className="text-4xl font-bold text-googleBlue mt-10">
          Find Local Black & Minority-Owned Businesses
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Discover and support businesses in your community.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {/* Search Query Input */}
          <input
            type="text"
            placeholder="Search for restaurants, shops..."
            className="border text-black rounded p-2 w-64"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          
          {/* Location Input (Primary) */}
          <input
  type="text"
  placeholder="Enter a location"
  className="border text-black rounded p-2 w-64"
  onChange={(e) => setSearchLocation(e.target.value)}
  value={searchLocation}
  autoComplete="on"
/>


          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={fetchBusinesses}
          >
            Search
          </button>
        </div>

        {/* Results Section */}
        <div className="mt-8 w-full max-w-lg">
          {loading ? (
            <p className="text-gray-500">Loading results...</p>
          ) : results.length > 0 ? (
            <ul className="bg-gray-100 rounded-md p-4 shadow-md">
              {results.map((biz) => (
                <li key={biz.id} className="p-4 border-b border-gray-300 last:border-none flex gap-4">
                  {/* Cover Image */}
                  {biz.image_url && (
                    <img
                      src={biz.image_url}
                      alt={biz.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  )}

                  {/* Business Info */}
                  <div>
                    <p className="text-lg font-semibold text-googleBlue">{biz.name}</p>
                    <p className="text-sm text-gray-600">{biz.location.address1}, {biz.location.city}</p>
                    <p className="text-sm text-gray-500">⭐ {biz.rating} ({biz.review_count} reviews)</p>

                    {/* Get Directions Button */}
                    <a
                      href={`https://www.google.com/maps/dir/${currentLocation || searchLocation}/${encodeURIComponent(
                        biz.location.address1 + " " + biz.location.city
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block bg-green-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Get Directions
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">No results found. Try a different search.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}




// "use client";
// import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function Home() {
//   const [results, setResults] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); 
//   const [location, setLocation] = useState("");
//   const [locationError, setLocationError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation(`${latitude},${longitude}`);
//         },
//         (error) => {
//           setLocationError("Location access denied. Enter location manually.");
//         }
//       );
//     } else {
//       setLocationError("Geolocation not supported.");
//     }
//   }, []);

//   const fetchBusinesses = async () => {
//     if (!location && !searchQuery) return;

//     setLoading(true);
//     setResults([]);

//     try {
//       const response = await fetch(`/api/yelp?location=${location}&term=${searchQuery}`);
//       if (!response.ok) throw new Error("Failed to fetch data");
      
//       const data = await response.json();
//       setResults(data.businesses || []);
//     } catch (error) {
//       console.error("Error fetching Yelp data:", error);
//       setResults([]);
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
//         <h1 className="text-4xl font-bold text-googleBlue mt-10">
//           Find Local Black & Minority-Owned Businesses
//         </h1>
//         <p className="text-lg text-gray-600 mt-2">
//           Discover and support businesses in your community.
//         </p>

//         {locationError && <p className="text-red-500 mt-4">{locationError}</p>}

//         <div className="mt-4 flex gap-2">
//           <input
//             type="text"
//             placeholder="Search for restaurants, shops..."
//             className="border text-black rounded p-2 w-64"
//             onChange={(e) => setSearchQuery(e.target.value)}
//             value={searchQuery}
//           />
//           <button
//             className="bg-blue-500 text-white p-2 rounded"
//             onClick={fetchBusinesses}
//           >
//             Search
//           </button>
//         </div>

//         {/* Results Section */}
//         <div className="mt-8 w-full max-w-lg">
//           {loading ? (
//             <p className="text-gray-500">Loading results...</p>
//           ) : results.length > 0 ? (
//               <ul className="bg-gray-100 rounded-md p-4 shadow-md">
//               {results.map((biz) => (
//                 <li key={biz.id} className="p-4 border-b border-gray-300 last:border-none flex gap-4">
//                   {/* Cover Image */}
//                   {biz.image_url && (
//                     <img
//                       src={biz.image_url}
//                       alt={biz.name}
//                       className="w-20 h-20 object-cover rounded-md"
//                     />
//                   )}

//                   {/* Business Info */}
//                   <div>
//                     <p className="text-lg font-semibold text-googleBlue">{biz.name}</p>
//                     <p className="text-sm text-gray-600">{biz.location.address1}, {biz.location.city}</p>
//                     <p className="text-sm text-gray-500">⭐ {biz.rating} ({biz.review_count} reviews)</p>

//                     {/* Get Directions Button */}
//                     <a
//                       href={`https://www.google.com/maps/dir/${location}/${encodeURIComponent(
//                         biz.location.address1 + " " + biz.location.city
//                       )}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-2 inline-block bg-green-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Get Directions
//                     </a>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             // <ul className="bg-gray-100 rounded-md p-4 shadow-md">
//             //   {results.map((biz) => (
//             //     <li key={biz.id} className="p-2 border-b border-gray-300 last:border-none">
//             //       <p className="text-lg font-semibold text-googleBlue">{biz.name}</p>
//             //       <p className="text-sm text-gray-600">{biz.location.address1}, {biz.location.city}</p>
//             //       <p className="text-sm text-gray-500">⭐ {biz.rating} ({biz.review_count} reviews)</p>
//             //     </li>
//             //   ))}
//             // </ul>
//           ) : (
//             <p className="text-gray-500 mt-4">No results found. Try a different search.</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

