import create from "zustand";
import Cookies from "js-cookie";
import { axiosInstance } from "~/lib/axiosInstance";
import { Restaurant } from "~/hook/useRestaurantHook";

interface CartStore {
  restaurant: Restaurant | null;
  foods: any[] | null;
  foodCounts: { [id: string]: number };
  loading: boolean;
  handleIncrement: (id: string, restoId: string) => Promise<void>;
  handleDecrement: (id: string, restoId: string) => Promise<void>;
  fetchCartData: () => Promise<void>;
  removeAllCartItems: () => Promise<void>;
}

const useCartStore = create<CartStore>((set) => ({
  restaurant: null,
  foods: null,
  foodCounts: {},
  loading: true,
  handleIncrement: async (id: string, restoId: string) => {
    const state = useCartStore.getState();
    if (state.restaurant && restoId !== state.restaurant._id) {

      console.log('ini resto', state.restaurant._id)
      // Different restoId detected, show alert
      const confirmation = window.confirm(
        "Want to order from this resto instead?\nSure thing, but we’ll need to clear the items in your current cart from the previous resto first."
      );

      if (confirmation) {
        // User confirmed, clear the cart and proceed
        await state.removeAllCartItems();
      } else {
        // User canceled, do nothing
        return;
      }
    }
    const auth_token = Cookies.get("auth_token");
    const newCount = state.foodCounts[id] ? state.foodCounts[id] + 1 : 1;
    const headers = {
      Authorization: `Bearer ${auth_token}`,
      "Content-Type": "application/json",
    };
    const response = await axiosInstance.post("/cart/add", { foodId: id, quantity: 1 }, { headers });
    if (response.data.is_success) {
      set((state) => ({
        foodCounts: { ...state.foodCounts, [id]: newCount },
      }));
      await state.fetchCartData();
    }
  },
  handleDecrement: async (id: string, restoId: string) => {
    const state = useCartStore.getState();
    if (state.restaurant && restoId !== state.restaurant._id) {
      await state.removeAllCartItems();
    }
    const auth_token = Cookies.get("auth_token");
    const newCount = state.foodCounts[id] ? Math.max(state.foodCounts[id] - 1, 0) : 0;
    const headers = {
      Authorization: `Bearer ${auth_token}`,
      "Content-Type": "application/json",
    };
    const response = await axiosInstance.post("/cart/add", { foodId: id, quantity: -1 }, { headers });
    if (response.data.is_success) {
      set((state) => ({
        foodCounts: { ...state.foodCounts, [id]: newCount },
      }));
      await state.fetchCartData();
    }
  },
  fetchCartData: async () => {
    const auth_token = Cookies.get("auth_token");
    const headers = {
      Authorization: `Bearer ${auth_token}`,
    };
    const response = await axiosInstance.get("/cart/user/allCart", { headers });
    if (response.data.is_success) {
      const newFoodCounts: { [id: string]: number } = {};
      const resto = response.data.resto[0];
      const foodList = response.data.food;
      // Update newFoodCounts, restaurant, and foods based on the data
      foodList.forEach((food: any) => {
        newFoodCounts[food._id] = food.quantity; // Assuming food has an ID and quantity property
      });
      set(() => ({
        restaurant: resto,
        foods: foodList,
        foodCounts: newFoodCounts,
        loading: false,
      }));
    }
  },
  removeAllCartItems: async () => {
    const auth_token = Cookies.get("auth_token");
    const headers = {
      Authorization: `Bearer ${auth_token}`,
    };
    const response = await axiosInstance.delete("https://sdg-12-b-backend-production.up.railway.app/api/cart/remove/allCart", { headers });
    if (response.data.is_success) {
      set(() => ({
        restaurant: null,
        foods: null,
        foodCounts: {},
      }));
    }
  },
}));

export default useCartStore;