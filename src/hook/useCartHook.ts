import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "~/lib/axiosInstance";
import { Restaurant } from "./useRestaurantHook";

const useCartHook = () => {
    const [foodCounts, setFoodCounts] = useState<{ [id: string]: number }>({});
    const [loading, setLoading] = useState(true);
    const [init, setInit] = useState(true);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [foods, setFoods] = useState<any[] | null>(null); // Adjust the type accordingly

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the user's cart data from the API
                const auth_token = Cookies.get("auth_token");
                const headers = {
                    Authorization: `Bearer ${auth_token}`,
                };
                const response = await axiosInstance.get("/cart/user/allCart", {
                    headers,
                });

                if (response.data.is_success) {
                    const newFoodCounts: { [id: string]: number } = {};
                    console.log('e', response);


                    // response.data.data.forEach((item: any) => {
                    //     const { foodId, quantity } = item;
                    //     const foodIdString = foodId._id;

                    //     if (foodIdString && quantity !== undefined) {
                    //         newFoodCounts[foodIdString] = quantity;
                    //     }
                    // });

                    setRestaurant(response.data.resto[0]);
                    setFoods(response.data.food);

                    setFoodCounts(newFoodCounts);
                    setLoading(false);
                } else {
                    console.error("Error fetching cart data:", response.data.message);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
                setLoading(false);
            }
        };

        if (init) {
            fetchData();
            setInit(false);
        }
        // Call the fetchData function when the component mounts
    }, [foodCounts]);

    const handleIncrement = async (id: string) => {
        try {
            const auth_token = Cookies.get("auth_token");
            const newCount = foodCounts[id] ? foodCounts[id] + 1 : 1;
            const headers = {
                Authorization: `Bearer ${auth_token}`,
                "Content-Type": "application/json",
            };

            const response = await axiosInstance.post(
                "/cart/add",
                {
                    foodId: id,
                    quantity: 1,
                },
                { headers }
            );

            if (response.data.is_success) {
                setFoodCounts({ ...foodCounts, [id]: newCount });
            } else {
                console.error("Error adding to cart:", response.data.message);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const handleDecrement = async (id: string) => {
        try {
            const auth_token = Cookies.get("auth_token");
            const newCount = foodCounts[id] ? foodCounts[id] - 1 : 1;
            const headers = {
                Authorization: `Bearer ${auth_token}`,
                "Content-Type": "application/json",
            };

            const response = await axiosInstance.post(
                "/cart/add",
                {
                    foodId: id,
                    quantity: -1,
                },
                { headers }
            );

            if (response.data.is_success) {
                setFoodCounts({ ...foodCounts, [id]: newCount });
            } else {
                console.error("Error removing from cart:", response.data.message);
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
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
