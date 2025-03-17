
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BusinessList from "../components/BusinessList";
import Map from "../components/Map";

interface Business {
  name: string;
  place_id: string;
  rating?: number;
  vicinity: string;
  opening_hours?: { open_now: boolean };
  geometry: { location: { lat: number; lng: number } };
}

export default function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const handleSearch = async (location: string) => {
    // Temporary placeholder businesses (replace later with API data)
    const placeholderBusinesses: Business[] = [
      {
        name: "Soul Food Cafe",
        place_id: "1",
        rating: 4.5,
        vicinity: "123 Main St, Cityville, CA",
        opening_hours: { open_now: true },
        geometry: { location: { lat: 37.7749, lng: -122.4194 } },
      },
      {
        name: "Afro Shop",
        place_id: "2",
        rating: 4.0,
        vicinity: "456 Broadway, Cityville, CA",
        opening_hours: { open_now: false },
        geometry: { location: { lat: 37.7849, lng: -122.4094 } },
      },
    ];
    setBusinesses(placeholderBusinesses);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Find Black-Owned Businesses</h1>
      <SearchBar onSearch={handleSearch} />
      <Map businesses={businesses} />
      <BusinessList businesses={businesses} />
    </div>
  );
}
