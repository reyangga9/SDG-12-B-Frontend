import { useState, useEffect } from 'react';
import { axiosInstance } from '~/lib/axiosInstance';

export type Restaurant = {
    _id: string;
    nama: string;
    category: string[];
    alamat: string;
    kota: string;
    avgRating: string;
    gambarRestaurant: string;
    rating: Rating[];
};

type Rating = {
    name: string;
    rating: number;
    comment?: string;
    _id: string;
}

type UseRestaurantHook = {
    restaurants: Restaurant[] | null;
    loading: boolean;
    restaurant: Restaurant | null;
    foods: any[] | null; // Adjust the type accordingly
};

type RequestType = 'mostLoved' | 'bestSeller' | 'random' | 'single';

const useRestaurantHook = (type: RequestType, id?: string): UseRestaurantHook => {
    const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [foods, setFoods] = useState<any[] | null>(null); // Adjust the type accordingly

    const fetchData = async () => {
        try {
            let endpoint = '';
            if (type === 'mostLoved') {
                endpoint = '/restaurant/mostLoved/';
            } else if (type === 'bestSeller') {
                endpoint = '/restaurant/mostSells/';
            } else if (type === 'random') {
                endpoint = '/restaurant/random/';
            } else if (type === 'single' && id) {
                endpoint = `/restaurant/restoandfood/${id}`;
            }

            const response = await axiosInstance.get(endpoint);
            if (type === 'single') {
                setRestaurant(response.data.restaurant);
                setFoods(response.data.food);
            } else {
                setRestaurants(response.data.data || response.data.restaurant);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type, id]);

    return {
        restaurants,
        loading,
        restaurant,
        foods,
    };
};

export default useRestaurantHook;