import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Restaurant, Food } from './types';

export const DetailPage = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [foods, setFoods] = useState<Food[] | null>(null);
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://sdg-12-b-backend-production.up.railway.app/api/restaurant/restoandfood/${id}`);
                setRestaurant(response.data.restaurant);
                setFoods(response.data.food); // Perhatikan bahwa ini adalah array makanan
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <div className='container mx-auto p-10'>
                <div className='flex flex-wrap justify-center items-center gap-5 mt-10'>
                    {restaurant && (
                        <div className='bg-gray-200 p-4 rounded-md'>
                            <h2 className='text-xl font-semibold'>{restaurant.nama}</h2>
                            <p>{restaurant.category}</p>
                            <p>Alamat: {restaurant.alamat}</p>
                            <p>Kota: {restaurant.kota}</p>
                            <img src={restaurant.gambarRestaurant} alt={restaurant.nama} className='mt-2 w-40 h-40 object-cover' />
                        </div>
                    )}

                    {foods && (
                        <div className='flex flex-wrap'>
                            {foods.map((food) => (
                                <div key={food._id} className='bg-gray-200 p-4 rounded-md m-2'>
                                    <h2 className='text-xl font-semibold'>{food.makanan}</h2>
                                    <p>Tanggal Expired: {food.tanggalExpired}</p>
                                    <p>Harga: {food.harga}</p>
                                    <p>Stok Makanan: {food.stokMakanan}</p>
                                    <img src={food.gambarMakanan} alt={food.makanan} className='mt-2 w-40 h-40 object-cover' />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
