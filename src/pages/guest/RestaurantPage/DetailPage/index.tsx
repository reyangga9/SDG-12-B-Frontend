import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Restaurant, Food } from "./types";
import { axiosInstance } from "~/lib/axiosInstance";
import axios from "axios";
import Cookies from "js-cookie";
import ReviewsSection from "./ReviewSection";
import RestoProfileSection from "./RestoProfileSection";
import MenuSection from "./MenuSection";

export const DetailPage = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [foods, setFoods] = useState<Food[] | null>(null);
  const [activeTab, setActiveTab] = useState("Menu");
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [foodCounts, setFoodCounts] = useState<{ [id: string]: number }>({});
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the user's cart data from the API
        const auth_token = Cookies.get("auth_token");
        const headers = {
          Authorization: `Bearer ${auth_token}`,
        };
        const response = await axios.get(
          "https://sdg-12-b-backend-production.up.railway.app/api/cart/user/allCart",
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
        } else {
          console.error("Error fetching cart data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/restaurant/restoandfood/${id}`
      );
      setRestaurant(response.data.restaurant);
      setFoods(response.data.food);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleIncrement = async (id: string) => {
    try {
      const auth_token = Cookies.get("auth_token");
      const newCount = foodCounts[id] ? foodCounts[id] + 1 : 1;
      console.log(auth_token);

      const headers = {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": "application/json", // Set the content type if needed
      };

      const response = await axios.post(
        "https://sdg-12-b-backend-production.up.railway.app/api/cart/add",
        {
          foodId: id,
          quantity: +1,
        },
        { headers } // Pass the headers to the request
      );
      console.log("Response:", response);

      setFoodCounts({ ...foodCounts, [id]: newCount });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const handleDecrement = async (id: string) => {
    try {
      const auth_token = Cookies.get("auth_token");
      console.log(foodCounts[id]);
      const newCount = foodCounts[id] ? foodCounts[id] - 1 : 1;
      console.log(newCount);
      const headers = {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": "application/json", // Set the content type if needed
      };

      const response = await axios.post(
        "https://sdg-12-b-backend-production.up.railway.app/api/cart/add",
        {
          foodId: id,
          quantity: -1,
        },
        { headers } // Pass the headers to the request
      );

      console.log("Response:", response);
      setFoodCounts({ ...foodCounts, [id]: newCount });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-32 py-10">
        <RestoProfileSection restaurant={restaurant} imageLoaded={imageLoaded} setImageLoaded={setImageLoaded} loading={loading} />

        <div className="tabs tabs-boxed p-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white font-semibold absolute left-1/2 transform -translate-x-1/2">
          <a
            className={`tab ${activeTab === "Menu" ? "tab-active" : ""}`}
            onClick={() => handleTabClick("Menu")}
          >
            Menu
          </a>
          <a
            className={`tab ${activeTab === "Reviews" ? "tab-active" : ""}`}
            onClick={() => handleTabClick("Reviews")}
          >
            Reviews
          </a>
        </div>

        {activeTab === "Menu" && (
          <MenuSection
            foods={foods}
            foodCounts={foodCounts}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
          />
        )}

        {activeTab === "Reviews" && restaurant && restaurant.rating && (
          <ReviewsSection ratings={restaurant.rating} />
        )}
      </div>
    </>
  );
};
