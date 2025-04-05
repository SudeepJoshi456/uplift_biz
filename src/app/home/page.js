// 'use client';

// import { useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/firebase/firebase";
// // import Signup from "./signup/page"; // adjust path if needed
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Search, MapPin } from "lucide-react";

// export default function Home() {
//   const [user, setUser] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [results, setResults] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");
//   const [currentLocation, setCurrentLocation] = useState("");
//   const [locationError, setLocationError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (u) => {
//       setUser(u);
//       setAuthLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation(`${latitude},${longitude}`);
//         },
//         () => {
//           setLocationError("Location access denied. Enter location manually.");
//         }
//       );
//     } else {
//       setLocationError("Geolocation not supported.");
//     }
//   }, []);

//   const fetchBusinesses = async () => {
//     if (!searchLocation || !searchQuery) return;
//     setLoading(true);
//     setResults([]);
//     try {
//       const response = await fetch(`/api/yelp?location=${searchLocation}&term=${searchQuery}`);
//       if (!response.ok) throw new Error("Failed to fetch data");
//       const data = await response.json();
//       setResults(data.businesses || []);
//     } catch (error) {
//       console.error("Error fetching Yelp data:", error);
//       setResults([]);
//     }
//     setLoading(false);
//   };

// //   // Show loader or signup screen first
// //   if (authLoading) return <p className="text-white p-4">Checking login...</p>;
// //   if (!user) return <Signup />;

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-700">
//         <h1 className="text-4xl font-bold text-white mt-10 text-center">
//           Find Local Black & Minority-Owned Businesses
//         </h1>
//         <p className="text-lg text-gray-300 mt-2 text-center">
//           Discover and support businesses in your community.
//         </p>

//         {locationError && <p className="text-red-500 mt-4">{locationError}</p>}

//         {/* Search and Location Inputs */}
//         <div className="mt-4 flex gap-2 items-center">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search for restaurants, shops..."
//               className="border border-gray-700 bg-gray-800 text-white rounded p-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={(e) => setSearchQuery(e.target.value)}
//               value={searchQuery}
//             />
//           </div>

//           <div className="relative">
//             <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Enter a location"
//               className="border border-gray-700 bg-gray-800 text-white rounded p-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={(e) => setSearchLocation(e.target.value)}
//               value={searchLocation}
//               autoComplete="on"
//             />
//           </div>

//           <button
//             className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center disabled:bg-gray-600/50 disabled:cursor-not-allowed relative group"
//             onClick={fetchBusinesses}
//             disabled={!searchQuery || !searchLocation}
//           >
//             <Search className="mr-2" size={18} /> Search
//             {(!searchQuery || !searchLocation) && (
//               <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
//                 Please fill both fields
//               </div>
//             )}
//           </button>
//         </div>

//         {/* Results */}
//         <div className="mt-8 w-full max-w-lg">
//           {loading ? (
//             <p className="text-gray-500">Loading results...</p>
//           ) : results.length > 0 ? (
//             <div className="bg-gray-800/90 backdrop-blur-md rounded-md p-4 shadow-lg max-h-[500px] overflow-y-auto">
//               {results.map((biz) => (
//                 <li
//                   key={biz.id}
//                   className="p-4 border-b border-gray-700 last:border-none flex gap-4 hover:bg-gray-700/50 transition-colors duration-300"
//                 >
//                   <div className="flex-shrink-0">
//                     {biz.image_url ? (
//                       <img
//                         src={biz.image_url}
//                         alt={biz.name}
//                         className="w-32 h-32 object-cover rounded-md"
//                       />
//                     ) : (
//                       <div className="w-32 h-32 bg-gray-700 rounded-md flex items-center justify-center">
//                         <span className="text-gray-400 text-sm">No Image</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-lg font-semibold text-white">{biz.name}</p>
//                     <p className="text-sm text-gray-300">{biz.location.address1}, {biz.location.city}</p>
//                     <p className="text-sm text-gray-400">⭐ {biz.rating} ({biz.review_count} reviews)</p>
//                   </div>
//                   <div className="flex items-center">
//                     <a
//                       href={`https://www.google.com/maps/dir/${currentLocation || searchLocation}/${encodeURIComponent(
//                         biz.location.address1 + " " + biz.location.city
//                       )}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-300"
//                     >
//                       Get Directions
//                     </a>
//                   </div>
//                 </li>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 mt-4">No results found. Try a different search.</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { Search, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [locationError, setLocationError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude},${longitude}`);
        },
        () => {
          setLocationError('Location access denied. Enter location manually.');
        }
      );
    } else {
      setLocationError('Geolocation not supported.');
    }
  }, []);

  const fetchBusinesses = async () => {
    if (!searchLocation || !searchQuery) return;
    setLoading(true);
    setResults([]);
    try {
      const response = await fetch(
        `/api/yelp?location=${searchLocation}&term=${searchQuery}`
      );
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setResults(data.businesses || []);
    } catch (error) {
      console.error('Error fetching Yelp data:', error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#fddede' }}
      >
        <div
          className="rounded-2xl shadow-xl flex max-w-4xl p-6 w-full"
          style={{ backgroundColor: '#fff5f7' }}
        >
          {/* Left Section */}
          <div className="w-1/2 flex flex-col items-center justify-center p-4 rounded-l-2xl">
            <img
              src="/images/home.png"
              alt="Cute mascot"
              className="w-full max-w-xs"
            />
          </div>

          {/* Right Section */}
          <div className="w-1/2 p-6">
            <h2 className="text-3xl font-bold mb-4 text-center text-black">
              Search Businesses
            </h2>

            {locationError && (
              <p className="text-red-500 text-center mb-4">{locationError}</p>
            )}

            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for restaurants, shops..."
                  className="border w-full p-2 pl-10 rounded text-black placeholder-gray-500"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter a location"
                  className="border w-full p-2 pl-10 rounded text-black placeholder-gray-500"
                  onChange={(e) => setSearchLocation(e.target.value)}
                  value={searchLocation}
                />
              </div>

              <button
                className="bg-[#520606] text-white px-4 py-2 rounded w-full"
                onClick={fetchBusinesses}
                disabled={!searchQuery || !searchLocation}
              >
                Search
              </button>
            </div>
          {/* result Section */}
          <div className="mt-8 w-full max-w-lg">
  {loading ? (
    <p className="text-gray-600">Loading results...</p>
  ) : results.length > 0 ? (
    <div className="bg-white/30 backdrop-blur-md rounded-md p-4 shadow-lg max-h-[500px] overflow-y-auto">
      {results.map((biz) => (
        <li
          key={biz.id}
          className="p-3 border-b border-gray-300 last:border-none flex flex-col sm:flex-row gap-1 hover:bg-white/20 transition-colors duration-300"
        >
          <div className="flex-shrink-0">
            {biz.image_url ? (
              <img
                src={biz.image_url}
                alt={biz.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md"
              />
            ) : (
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gray-300 rounded-md flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-black">{biz.name}</p>
            <p className="text-sm text-gray-700">
              {biz.location.address1}, {biz.location.city}
            </p>
            <p className="text-sm text-gray-600">
              ⭐ {biz.rating} ({biz.review_count} reviews)
            </p>
          </div>
          <div className="flex items-center justify-end sm:justify-center">
            <a
              href={`https://www.google.com/maps/dir/${currentLocation || searchLocation}/${encodeURIComponent(
                biz.location.address1 + " " + biz.location.city
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#520606] text-white px-1 py-1 text-xs sm:text-sm rounded hover:bg-green-700 transition-colors duration-300"
            >
              Get Directions
            </a>
          </div>
        </li>
      ))}
    </div>
  ) : (
    <p className="text-gray-600 mt-4">No results found. Try a different search.</p>
  )}
</div>
</div>
        </div>
      </div>
      <Footer />
    </>
  );
}


