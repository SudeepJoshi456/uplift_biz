import { useState } from "react";

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState<string>("");

  const handleSearch = () => {
    if (location.trim() === "") return;
    onSearch(location);
  };

  return (
    <div className="flex items-center gap-2 p-4">
      <input
        type="text"
        placeholder="Enter city or ZIP code"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
