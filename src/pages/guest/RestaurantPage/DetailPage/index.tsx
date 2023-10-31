import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Restaurant, Food } from './types';
import { Star } from 'lucide-react';


export const DetailPage = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [foods, setFoods] = useState<Food[] | null>(null);
    const [activeTab, setActiveTab] = useState('Menu');
    let { id } = useParams();


    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}restaurant/restoandfood/${id}`);
            setRestaurant(response.data.restaurant);
            setFoods(response.data.food);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
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
                            {restaurant.category && <h3 className="text-lg text-neutral-600">{restaurant.category.join(', ')}</h3>}
                            <h3 className="text-lg text-neutral-600">{restaurant.alamat}</h3>
                        </div>
                        <figure className='flex-none h-full'>
                            <img src={restaurant.gambarRestaurant} alt={restaurant.nama} className='w-40 h-40 border rounded-xl object-cover' />
                        </figure>
                    </div>
                )}

                <div className="tabs tabs-boxed p-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white font-semibold absolute left-1/2 transform -translate-x-1/2">
                    <a className={`tab ${activeTab === 'Menu' ? 'tab-active' : ''}`} onClick={() => handleTabClick('Menu')}>Menu</a>
                    <a className={`tab ${activeTab === 'Reviews' ? 'tab-active' : ''}`} onClick={() => handleTabClick('Reviews')}>Reviews</a>
                </div>

                {activeTab === 'Menu' && foods && (
                    <div className='flex flex-wrap gap-5 mt-20'>
                        {foods.map((food, index) => (
                            <div key={index}>
                                <div className="card w-72 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all duration-300">
                                    <figure className="px-2 pt-2">
                                        <img src={food.gambarMakanan} alt={food.makanan} className="w-full h-60 border object-cover bg-gray-100 rounded-xl" />
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
                        <h2 className='text-xl font-semibold mb-3'>All Reviews</h2>
                        {restaurant.rating.map((rating, index) => (
                            <div key={index}>
                                <div className='mb-3 flex items-center'>
                                    <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3'>
                                        {rating.name && <p className='text-white text-lg font-bold'>{rating.name[0]}</p>}
                                    </div>
                                    <div>
                                        <p className='font-bold'>{rating.name}</p>
                                    </div>
                                    <div className=" bg-white px-2 py-1 rounded-full shadow-lg ml-auto">
                                        <div className="flex items-center gap-2">
                                            <Star size={20} fill='yellow' className='text-yellow-500' />
                                            <span className="text-md font-semibold">{rating.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mb-3">
                                    <div className="bg-white text-black p-4 rounded-xl shadow-md">
                                        {rating.comment && <p>{rating.comment}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    );
};