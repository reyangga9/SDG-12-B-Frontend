import { useCallback, useEffect } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import useCartStore from "~/store/cartStore";
import { useNavigate } from "react-router-dom";

const CartSection = () => {
  const {
    handleIncrement,
    handleDecrement,
    foodCounts,
    restaurant,
    foods,
    fetchCartData,
  } = useCartStore();

  const navigate = useNavigate()

  // Calculate total food count using foodCounts state
  const calculateTotalFoodCount = useCallback(() => {
    return Object.values(foodCounts).reduce((total, count) => total + count, 0);
  }, [foodCounts]);

  useEffect(() => {
    // Fetch cart data when the component mounts
    fetchCartData();
  }, [fetchCartData]);

  // Calculate total price using foodCounts state
  const calculateTotalPrice = useCallback(() => {
    return (
      foods?.reduce((totalPrice, food) => {
        const count = foodCounts[food._id] || 0;
        return totalPrice + food.harga * count;
      }, 0) || 0
    );
  }, [foods, foodCounts]);

  const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(calculateTotalPrice());

  const isFoodSelected = calculateTotalFoodCount() > 0;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-primary badge-sm indicator-item">
            {calculateTotalFoodCount()}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-[26rem] p-2 bg-white shadow"
      >
        <div className="card-body">
          <span className="font-semibold text-lg">Your Order</span>
          {isFoodSelected && restaurant && (
            <h2 className="text-sm text-neutral-600 -mt-2 mb-5">
              {restaurant.nama}
            </h2>
          )}
          {foods?.map((foodItem, index) => {
            const foodCount = foodCounts[foodItem._id] || 0;
            return foodCount > 0 ? (
              <div key={index} className="grid grid-cols-3 mt-2">
                <span className="font-semibold">{foodItem.makanan}</span>
                <div className="grid grid-cols-3 items-center gap-3 ml-10">
                  <button
                    onClick={() => handleDecrement(foodItem._id, foodItem.restoId)}
                    className="btn btn-xs btn-circle btn-primary"
                  >
                    <Minus size={15} strokeWidth={3} />
                  </button>
                  <span className="text-center">{foodCount}</span>
                  <button
                    onClick={() => handleIncrement(foodItem._id, foodItem.restoId)}
                    className="btn btn-xs btn-circle btn-primary"
                  >
                    <Plus size={15} strokeWidth={3} />
                  </button>
                </div>
                <p className="text-sm font-medium ml-auto">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(foodItem.harga * foodCount)}
                </p>
              </div>
            ) : null;
          })}
          {isFoodSelected ? (
            <div className="card-actions mt-32">
              <span className="font-bold text-base">Total Price:</span>
              <span className="font-bold text-base ml-auto mb-2">
                {formattedTotalPrice}
              </span>
              <button onClick={() => navigate('/checkout')} className="btn btn-primary btn-block">
                Continue to checkout
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-32">
              <ShoppingCart size={40} />
              <p className="text-lg text-center text-neutral-600">
                Your cart is empty. Let's discover our collections of popular
                dishes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default CartSection;
