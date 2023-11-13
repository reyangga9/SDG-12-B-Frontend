import React from 'react';
import RestaurantSection from './RestaurantSection';
import useRestaurantHook from '~/hook/useRestaurantHook';
import hero2 from '~/assets/hero2.png';

interface RestaurantPageProps {
    title: string;
    hookType: 'mostLoved' | 'bestSeller' | 'random';
}

const RestaurantPage: React.FC<RestaurantPageProps> = ({ title, hookType }) => {
    const { restaurants, loading } = useRestaurantHook(hookType);

    return (
        <>
            <div className="hero h-96" style={{ backgroundImage: `url(${hero2})` }}>
                <div className="hero-content text-black">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">FoodGuardian</h1>
                        <h1 className="mb-5 text-2xl font-semibold">
                            Eksplor kumpulan rekomendasi yang kami buat untuk berbagai kebutuhanmu
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-32 py-10">
                <div className="font-semibold text-4xl">
                    <span>{title}</span>
                </div>
                <RestaurantSection restaurants={restaurants} loading={loading} />
            </div>
        </>
    );
};

export default RestaurantPage;
