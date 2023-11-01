import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import { Restaurant } from './types';
import hero2 from '~/assets/hero2.png';
import bestseller from '~/assets/best-seller.png';
import mostloved from '~/assets/most-loved.png';
import { axiosInstance } from '~/lib/axiosInstance';

const SkeletonLoading = () => {
    return (
        <div className="card w-72 h-full bg-base-100 border mb-8 animate-pulse transition-all duration-300 ease-in-out">
            <figure className="px-2 pt-2">
                <div className="w-full h-60 border object-cover bg-gray-100 rounded-xl"></div>
            </figure>
            <div className="card-body px-3 py-3">
                <div className="w-full h-6 bg-gray-300 rounded-lg mb-2"></div>
                <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
            </div>
        </div>
    );
};

const RecommendationsPage = () => {
    const [bestSeller, setBestSeller] = useState<Restaurant[]>([]);
    const [mostLoved, setMostLoved] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const BestSellerResponse = await axiosInstance.get('/restaurant/mostSells');
            const MostLovedResponse = await axiosInstance.get('/restaurant/mostLoved');

            setBestSeller(BestSellerResponse.data.data);
            setMostLoved(MostLovedResponse.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
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
                <section id='best-seller'>
                    <div className='flex items-center gap-5'>
                        <figure>
                            <img src={bestseller} alt="bestseller" className="w-12" />
                        </figure>
                        <div className='font-semibold text-2xl'>
                            <span>Best Seller</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-5 mt-10'>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <div key={index}>
                                    <SkeletonLoading />
                                </div>
                            ))
                        ) : (
                            bestSeller.map((restaurant, index) => (
                                <div key={index} onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
                                    <div className="card w-72 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all transform hover:scale-[1.02] duration-300 ease-in-out">
                                        <figure className="px-2 pt-2">
                                            <img
                                                src={restaurant.gambarRestaurant}
                                                alt={restaurant.nama}
                                                className={`w-full h-60 border object-cover bg-gray-100 rounded-xl transition-all duration-500 ease-in-out filter ${!imageLoaded ? 'blur-lg' : ''}`}
                                                onLoad={() => {
                                                    setTimeout(() => {
                                                        setImageLoaded(true);
                                                    }, 100); // You can adjust the delay (in milliseconds) as needed
                                                }}
                                            />
                                            <div className="absolute transform translate-y-24 right-3 bg-white px-2 py-1 rounded-full shadow-lg">
                                                <div className="flex items-center gap-2">
                                                    <StarIcon size={20} fill='yellow' className='text-yellow-500' />
                                                    <span className="text-md font-semibold">{restaurant.avgRating}</span>
                                                </div>
                                            </div>
                                        </figure>
                                        <div className="card-body px-3 py-3">
                                            <h2 className="card-title">{restaurant.nama}</h2>
                                            {restaurant.category && <p className="text-sm">{restaurant.category.join(', ')}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div >
                    <div className='flex justify-center mt-10'>
                        <Link to={'/restaurants/best_seller'}>
                            <button className="btn btn-secondary normal-case">Show All Restos</button>
                        </Link>
                    </div>
                </section >

                <section id='most-loved' className='mt-10'>
                    <div className='flex items-center gap-5'>
                        <figure className="flex">
                            <img src={mostloved} alt="mostloved" className="w-12" />
                        </figure>
                        <div className='font-semibold text-2xl'>
                            <span>Most Loved</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-5 mt-10'>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <div key={index}>
                                    <SkeletonLoading />
                                </div>
                            ))
                        ) : (
                            mostLoved.map((restaurant, index) => (
                                <div key={index} onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
                                    <div className="card w-72 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all transform hover:scale-[1.02] duration-300 ease-in-out">
                                        <figure className="px-2 pt-2">
                                            <img
                                                src={restaurant.gambarRestaurant}
                                                alt={restaurant.nama}
                                                className={`w-full h-60 border object-cover bg-gray-100 rounded-xl transition-all duration-500 ease-in-out filter ${!imageLoaded ? 'blur-lg' : ''}`}
                                                onLoad={() => {
                                                    setTimeout(() => {
                                                        setImageLoaded(true);
                                                    }, 100); // You can adjust the delay (in milliseconds) as needed
                                                }}
                                            />
                                            <div className="absolute transform translate-y-24 right-3 bg-white px-2 py-1 rounded-full shadow-lg">
                                                <div className="flex items-center gap-2">
                                                    <StarIcon size={20} fill='yellow' className='text-yellow-500' />
                                                    <span className="text-md font-semibold">{restaurant.avgRating}</span>
                                                </div>
                                            </div>
                                        </figure>
                                        <div className="card-body px-3 py-3">
                                            <h2 className="card-title">{restaurant.nama}</h2>
                                            {restaurant.category && <p className="text-sm">{restaurant.category.join(', ')}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div >
                    <div className='flex justify-center mt-10'>
                        <Link to={'/restaurants/most_loved'}>
                            <button className="btn btn-secondary normal-case">Show All Restos</button>
                        </Link>
                    </div>
                </section>
            </div >
        </>
    );
};

export default RecommendationsPage;
