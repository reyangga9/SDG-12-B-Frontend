import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Restaurant, Food } from './types';
import { Star } from 'lucide-react';

export const DetailPage = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [foods, setFoods] = useState<Food[] | null>(null);
    const [activeTab, setActiveTab] = useState('Menu');
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    let { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}restaurant/restoandfood/${id}`);
            setRestaurant(response.data.restaurant);
            setFoods(response.data.food);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
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
                {loading ? (
                    <div className='flex justify-between space-x-7 animate-pulse'>
                        <div className='flex flex-col w-full'>
                            <div className="w-1/2 h-6 bg-gray-300 rounded-lg mb-2"></div>
                            <div className="w-1/6 h-4 bg-gray-300 rounded-md mb-2"></div>
                            <div className="w-5/12 h-6 bg-gray-300 rounded-lg mb-2"></div>
                        </div>
                        <figure className='flex-none h-full'>
                            <div className="w-40 h-40 border object-cover bg-gray-100 rounded-xl"></div>
                        </figure>
                    </div>
                ) : (
                    restaurant && (
                        <div className='flex justify-between space-x-7'>
                            <div className='flex flex-col w-full'>
                                <h2 className='text-2xl font-semibold'>{restaurant.nama}</h2>
                                {restaurant.category && (
                                    <h3 className='text-lg text-neutral-600'>{restaurant.category.join(', ')}</h3>
                                )}
                                <h3 className='text-lg text-neutral-600'>{restaurant.alamat}</h3>
                            </div>
                            <figure className='flex-none h-full'>
                                <img
                                    src={restaurant.gambarRestaurant}
                                    alt={restaurant.nama}
                                    className={`w-40 h-40 border object-cover bg-gray-100 rounded-xl transition-all duration-500 ease-in-out filter ${!imageLoaded ? 'blur-lg' : ''}`}
                                />
                            </figure>
                        </div>
                    )
                )}

                <div className="tabs tabs-boxed p-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white font-semibold absolute left-1/2 transform -translate-x-1/2">
                    <a className={`tab ${activeTab === 'Menu' ? 'tab-active' : ''}`} onClick={() => handleTabClick('Menu')}>Menu</a>
                    <a className={`tab ${activeTab === 'Reviews' ? 'tab-active' : ''}`} onClick={() => handleTabClick('Reviews')}>Reviews</a>
                </div>

                {activeTab === 'Menu' && (
                    <div className='flex flex-wrap gap-5 mt-20'>
                        {!foods ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={index}>
                                    <div className="card w-72 h-full bg-base-100 border mb-8 animate-pulse transition-all duration-300 ease-in-out">
                                        <figure className="px-2 pt-2">
                                            <div className="w-full h-60 border object-cover bg-gray-100 rounded-xl"></div>
                                        </figure>
                                        <div className="card-body px-3 py-3">
                                            <div className="w-full h-6 bg-gray-300 rounded-lg"></div>
                                            <div className="w-1/2 h-6 bg-gray-300 rounded-lg mb-2"></div>
                                            <div className="w-1/3 h-5 bg-gray-300 rounded-md"></div>
                                            <div className="w-full h-12 bg-gray-300 rounded-full mt-10 -mb-8"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            foods.map((food, index) => (
                                <div key={index}>
                                    <div className="card w-72 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all duration-300">
                                        <figure className="px-2 pt-2">
                                            <img
                                                src={food.gambarMakanan}
                                                alt={food.makanan}
                                                className={`w-full h-60 border object-cover bg-gray-100 rounded-xl transition-all duration-500 ease-in-out filter ${!imageLoaded ? 'blur-lg' : ''}`}
                                                onLoad={() => {
                                                    setTimeout(() => {
                                                        setImageLoaded(true);
                                                    }, 100);
                                                }}
                                            />
                                        </figure>
                                        <div className="card-body px-3 py-3">
                                            <h2 className="card-title">{food.makanan}</h2>
                                            <p className="text-base font-medium">{food.harga}</p>
                                            <button className="btn btn-primary normal-case text-base">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'Reviews' && restaurant && restaurant.rating && (
                    <div className='reviews-content'>
                        <h2 className='text-xl font-semibold mb-3'>All Reviews</h2>
                        {restaurant.rating.length > 0 ? (
                            restaurant.rating.map((rating, index) => (
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
                            ))
                        ) : (
                            <div className='p-20'>
                                <p>No reviews available.</p>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </>
    );
};
