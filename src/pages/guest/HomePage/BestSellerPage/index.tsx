import React, { useState, useEffect } from 'react';
import axios from 'axios';
import hero2 from '~/assets/hero2.png';

interface Restaurant {
    _id: string;
    nama: string;
    alamat: string;
    kota: string;
    gambarRestaurant: string;
    // Definisikan properti lainnya sesuai dengan respons API
}

export const BestSellerPage = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://sdg-12-b-backend-production.up.railway.app/api/restaurant/mostSells');
                setRestaurants(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="hero h-96" style={{ backgroundImage: `url(${hero2})` }}>
                <div className="hero-content text-black">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">FoodGuardian</h1>
                        <h1 className="mb-5 text-2xl font-semibold">Eksplor  kumpulan rekomendasi yang kami buat untuk berbagai kebutuhanmu</h1>
                    </div>
                </div>
            </div>
            <div className='container mx-auto p-10'>
                <div className='text-center font-semibold text-4xl p-3'>
                    <span>Best Seller</span>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-5 mt-10'>
                    {Array.isArray(restaurants) && restaurants.length > 0 ? (
                        restaurants.map((restaurant, index) => (
                            <div key={index}>
                                <div className="card w-72 h-90 bg-base-100 border hover:shadow-xl mb-8 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                                    <figure className="px-2 pt-2">
                                        <img src={restaurant.gambarRestaurant} alt={restaurant.nama} className="w-full bg-gray-100 rounded-xl" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{restaurant.nama}</h2>
                                        <p className="text-sm">{restaurant.alamat}, {restaurant.kota}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No restaurants available</p>
                    )}
                </div>
            </div>
        </>
    );
};
