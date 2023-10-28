import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Restaurant, Food } from './types';

export const DetailPage = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [foods, setFoods] = useState<Food[] | null>(null);
    const [activeTab, setActiveTab] = useState('Menu');
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://sdg-12-b-backend-production.up.railway.app/api/restaurant/restoandfood/${id}`);
                setRestaurant(response.data.restaurant);
                setFoods(response.data.food);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className='container mx-auto px-32 py-10'>
                {restaurant && (
                    <div className='flex justify-between space-x-7'>
                        <div className='flex flex-col w-full'>
                            <h2 className='text-2xl font-semibold'>{restaurant.nama}</h2>
                            <h3 className='text-lg text-neutral-700 font-medium'>{restaurant.category}</h3>
                            <p>{restaurant.alamat}</p>
                        </div>
                        <figure className='flex-none h-full'>
                            <img src={restaurant.gambarRestaurant} alt={restaurant.nama} className='w-40 h-40 rounded-xl object-cover' />
                        </figure>
                    </div>
                )}

                <div className="tabs tabs-boxed font-semibold absolute left-1/2 transform -translate-x-1/2">
                    <a className={`tab ${activeTab === 'Menu' ? 'tab-active' : ''}`} onClick={() => handleTabClick('Menu')}>Menu</a>
                    <a className={`tab ${activeTab === 'Reviews' ? 'tab-active' : ''}`} onClick={() => handleTabClick('Reviews')}>Reviews</a>
                </div>

                {activeTab === 'Menu' && foods && (
                    <div className='flex flex-wrap gap-5 mt-20'>
                        {foods.map((food, index) => (
                            <div key={index}>
                                <div className="card w-72 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all duration-300">
                                    <figure className="px-2 pt-2">
                                        <img src={food.gambarMakanan} alt={food.makanan} className="w-full h-60 object-cover bg-gray-100 rounded-xl" />
                                    </figure>
                                    <div className="card-body px-3 py-3">
                                        <h2 className="card-title">{food.makanan}</h2>
                                        <p className="text-base font-medium">{food.harga}</p>
                                        <button className="btn btn-primary normal-case text-base">Add</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'Reviews' && restaurant && restaurant.rating && (
                    <div className='reviews-content'>
                        <h2 className='text-xl font-semibold mb-3'>Customer Reviews</h2>
                        {restaurant.rating.map((rating, index) => (
                            <div key={index} className='mb-3'>
                                <p><strong>User ID:</strong> {rating.userId}</p>
                                <p><strong>Rating:</strong> {rating.rating}</p>
                                {rating.comment && <p><strong>Comment:</strong> {rating.comment}</p>}
                                <hr className='my-2' />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    );
};
