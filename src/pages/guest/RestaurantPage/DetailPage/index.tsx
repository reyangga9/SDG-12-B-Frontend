import { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewsSection from "./ReviewSection";
import RestoProfileSection from "./RestoProfileSection";
import MenuSection from "./MenuSection";
import useRestaurantHook from "~/hook/useRestaurantHook";
import useCartHook from "~/hook/useCartHook";

export const DetailPage = () => {
  const [activeTab, setActiveTab] = useState("Menu");
  const [imageLoaded, setImageLoaded] = useState(false);
  const { id } = useParams();
  const { restaurant, foods, loading: restaurantLoading } = useRestaurantHook('single', id);
  const { foodCounts, handleIncrement, handleDecrement } = useCartHook();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="container mx-auto px-32 py-10">
        <RestoProfileSection restaurant={restaurant} imageLoaded={imageLoaded} setImageLoaded={setImageLoaded} loading={restaurantLoading} />

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
