import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantSection from ".././RestaurantSection";
import { Restaurant } from "~/hook/useRestaurantHook";
import { Search } from "lucide-react";

export default function OurShopPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://sdg-12-b-backend-production.up.railway.app/api/restaurant/search/${searchInput}`
      );
      setSearchResults(response.data.restaurant);
      // console.log("tes", response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto px-32 py-10">
          <div className="font-semibold text-4xl mb-4">
            <span>Our Shop</span>
          </div>
          <form onSubmit={handleSearch}>
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search size={20} className="text-neutral-500" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-lg border rounded-2xl"
                placeholder="Search for restaurants..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
          </form>
          <RestaurantSection restaurants={searchResults} loading={loading} />
        </div>
      </div>
    </>
  );
}
