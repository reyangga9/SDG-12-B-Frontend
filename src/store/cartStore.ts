import create from "zustand";
// import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { axiosInstance } from "~/lib/axiosInstance";
import { Restaurant } from "~/hook/useRestaurantHook";

interface CartStore {
  restaurant: Restaurant | null;
  foods: any[] | null;
  foodCounts: { [id: string]: number };
  loading: boolean;
  handleIncrement: (id: string) => Promise<void>;
  handleDecrement: (id: string) => Promise<void>;
  fetchCartData: () => Promise<void>; // Define fetchCartData function
}

const useCartStore = create<CartStore>((set) => ({
  restaurant: null,
  foods: null,
  foodCounts: {},
  loading: true,
  handleIncrement: async (id: string) => {
    try {
      const auth_token = Cookies.get("auth_token");
      const newCount = useCartStore.getState().foodCounts[id]
        ? useCartStore.getState().foodCounts[id] + 1
        : 1; // Access foodCounts from the state
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
        set((state) => ({
          foodCounts: { ...state.foodCounts, [id]: newCount },
        }));
      } else {
        console.error("Error adding to cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },
  handleDecrement: async (id: string) => {
    try {
      const auth_token = Cookies.get("auth_token");
      const newCount = useCartStore.getState().foodCounts[id]
        ? useCartStore.getState().foodCounts[id] - 1
        : 1; // Access foodCounts from the state
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
        set((state) => ({
          foodCounts: { ...state.foodCounts, [id]: newCount },
        }));
      } else {
        console.error("Error removing from cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },
  fetchCartData: async () => {
    try {
      const auth_token = Cookies.get("auth_token");
      const headers = {
        Authorization: `Bearer ${auth_token}`,
      };
      const response = await axiosInstance.get("/cart/user/allCart", {
        headers,
      });

      if (response.data.is_success) {
        const newFoodCounts: { [id: string]: number } = {};

        // Process the data from the response
        const resto = response.data.resto[0];
        const foodList = response.data.food;

        // Update newFoodCounts, restaurant, and foods based on the data
        foodList.forEach((food: any) => {
          newFoodCounts[food._id] = food.quantity; // Assuming food has an ID and quantity property
        });

        set((state) => ({
          restaurant: resto,
          foods: foodList,
          foodCounts: newFoodCounts,
          loading: false,
        }));
      } else {
        console.error("Error fetching cart data:", response.data.message);
        set({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      set({ loading: false });
    }
  },
}));

export default useCartStore;
