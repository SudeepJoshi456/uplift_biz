"use client";
import Footer from "@/components/Footer";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Placeholder function (Google API will be integrated later)
    console.log("Searching for:", searchQuery);
    setResults([
      { name: "Black Coffee Lounge", address: "123 Main St, Atlanta, GA" },
      { name: "Minority Tech Hub", address: "456 Tech St, New York, NY" },
    ]);
  };

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-googleBlue mt-10">Find Local Black & Minority-Owned Businesses</h1>
      <p className="text-lg text-gray-600 mt-2">Discover and support businesses in your community.</p>

      {/* Search Bar */}
      <div className="mt-6 flex space-x-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search for businesses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 text-googleGray border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-googleBlue"
        />
        <button
          onClick={handleSearch}
          className="bg-googleYellow hover:bg-googleGreen text-white px-4 py-2 rounded-md transition"
        >
          Search
        </button>
      </div>

      {/* Results Section */}
      <div className="mt-8 w-full max-w-lg">
        {results.length > 0 ? (
          <ul className="bg-gray-100 rounded-md p-4 shadow-md">
            {results.map((biz, index) => (
              <li key={index} className="p-2 border-b border-gray-300 last:border-none">
                <p className="text-lg font-semibold text-googleBlue">{biz.name}</p>
                <p className="text-sm text-gray-600">{biz.address}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No results found. Try searching for something else.</p>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
