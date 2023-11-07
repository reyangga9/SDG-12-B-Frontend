import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { axiosInstance } from '~/lib/axiosInstance';

const useCartHook = () => {
    const [foodCounts, setFoodCounts] = useState<{ [id: string]: number }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the user's cart data from the API
                const auth_token = Cookies.get('auth_token');
                const headers = {
                    Authorization: `Bearer ${auth_token}`,
                };
                const response = await axiosInstance.get(
                    '/cart/user/allCart',
                    { headers }
                );

                if (response.data.is_success) {
                    const newFoodCounts: { [id: string]: number } = {};

                    response.data.data.forEach((item: any) => {
                        const { foodId, quantity } = item;
                        const foodIdString = foodId._id;

                        if (foodIdString && quantity !== undefined) {
                            newFoodCounts[foodIdString] = quantity;
                        }
                    });

                    setFoodCounts(newFoodCounts);
                    setLoading(false);
                } else {
                    console.error('Error fetching cart data:', response.data.message);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
                setLoading(false);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, [foodCounts]);

    const handleIncrement = async (id: string) => {
        try {
            const auth_token = Cookies.get('auth_token');
            const newCount = foodCounts[id] ? foodCounts[id] + 1 : 1;
            const headers = {
                Authorization: `Bearer ${auth_token}`,
                'Content-Type': 'application/json',
            };

            const response = await axiosInstance.post(
                '/cart/add',
                {
                    foodId: id,
                    quantity: 1,
                },
                { headers }
            );

            if (response.data.is_success) {
                setFoodCounts({ ...foodCounts, [id]: newCount });
            } else {
                console.error('Error adding to cart:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleDecrement = async (id: string) => {
        try {
            const auth_token = Cookies.get('auth_token');
            const newCount = foodCounts[id] ? foodCounts[id] - 1 : 1;
            const headers = {
                Authorization: `Bearer ${auth_token}`,
                'Content-Type': 'application/json',
            };

            const response = await axiosInstance.post(
                '/cart/add',
                {
                    foodId: id,
                    quantity: -1,
                },
                { headers }
            );

            if (response.data.is_success) {
                setFoodCounts({ ...foodCounts, [id]: newCount });
            } else {
                console.error('Error removing from cart:', response.data.message);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    return {
        foodCounts,
        loading,
        handleIncrement,
        handleDecrement,
    };
};

export default useCartHook;
