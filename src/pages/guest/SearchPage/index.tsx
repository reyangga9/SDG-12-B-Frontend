import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantSection from "../RestaurantPage/RestaurantSection";
import { Restaurant } from "~/hook/useRestaurantHook";

export default function SearchPage() {
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
            console.log('tes', response)
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
        <div className="container mx-auto p-10">
            <h1 className="text-3xl font-semibold mb-4">Search Restaurants</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search for restaurants..."
                    className="border rounded p-2 w-full"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
            </div>
            <RestaurantSection restaurants={searchResults} loading={loading} />
        </div>
    );
}
