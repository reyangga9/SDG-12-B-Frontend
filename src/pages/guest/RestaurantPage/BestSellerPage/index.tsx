import { useState, useEffect } from 'react';
import axios from 'axios';
import hero2 from '~/assets/hero2.png';

interface Restaurant {
    _id: string;
    nama: string;
    category: string;
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
            <div className='container mx-auto px-32 py-10'>
                <div className='font-semibold text-4xl'>
                    <span>Best Sellers</span>
                </div>
                <div className='flex flex-wrap gap-5 mt-10'>
                    {Array.isArray(restaurants) && restaurants.length > 0 ? (
                        restaurants.map((restaurant, index) => (
                            <div key={index}>
                                <div className="card w-72 h-96 bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all transform hover:scale-[1.02] duration-300 ease-in-out">
                                    <figure className="px-2 pt-2">
                                        <img src={restaurant.gambarRestaurant} alt={restaurant.nama} className="w-full h-60 object-cover bg-gray-100 rounded-xl" />
                                    </figure>
                                    <div className="card-body px-3 py-3">
                                        <h2 className="card-title">{restaurant.nama}</h2>
                                        <p className="text-sm">{restaurant.category}</p>
                                        {/* <p className="text-sm">{restaurant.alamat}, {restaurant.kota}</p> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No restaurants available</p>
                    )}
                </div >
            </div >
        </>
    );
};
