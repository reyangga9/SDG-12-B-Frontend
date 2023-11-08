import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "~/lib/axiosInstance";
import { Restaurant } from "./useRestaurantHook";

const useCartHook = () => {
    const [foodCounts, setFoodCounts] = useState<{ [id: string]: number }>({});
    const [loading, setLoading] = useState(true);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [foods, setFoods] = useState<any[] | null>(null); // Adjust the type accordingly
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const auth_token = Cookies.get('auth_token');
                const response = await axiosInstance.get('/cart/user/allCart', {
                    headers: {
                        Authorization: `Bearer ${auth_token}`,
                    },
                });

                if (response.data.is_success) {
                    const newFoodCounts: { [id: string]: number } = {};
                    response.data.food?.forEach((item: any) => {
                        const foodIdString = item._id; // Directly use _id from the item
                        const quantity = item.quantity;
                        if (foodIdString && quantity !== undefined) {
                            newFoodCounts[foodIdString] = quantity;
                        }
                    });

                    setFoodCounts(newFoodCounts);
                    setRestaurant(response.data.resto[0]);
                    setFoods(response.data.food);
                } else {
                    console.error('Fetch data unsuccessful:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleIncrement = async (id: string) => {
        const auth_token = Cookies.get('auth_token');
        const headers = {
            Authorization: `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
        };

        const response = await axiosInstance.post('/cart/add', {
            foodId: id,
            quantity: 1,
        }, { headers });

        if (response.data.is_success) {
            setFoodCounts(currentCounts => {
                const newCount = currentCounts[id] ? currentCounts[id] + 1 : 1;
                return { ...currentCounts, [id]: newCount };
            });
        }
    };

    const handleDecrement = async (id: string) => {
        const auth_token = Cookies.get('auth_token');
        const headers = {
            Authorization: `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
        };

        const response = await axiosInstance.post('/cart/add', {
            foodId: id,
            quantity: -1,
        }, { headers });

        if (response.data.is_success) {
            setFoodCounts(currentCounts => {
                const newCount = currentCounts[id] && currentCounts[id] > 1 ? currentCounts[id] - 1 : 0;
                return { ...currentCounts, [id]: newCount };
            });
        }
    };

    return {
        restaurant,
        foods,
        foodCounts,
        loading,
        handleIncrement,
        handleDecrement,
    };
};


export default useCartHook;
