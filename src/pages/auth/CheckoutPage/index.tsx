import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, BadgeDollarSign, Minus, Plus } from "lucide-react";
import useCartStore from "~/store/cartStore";
import { BiSolidFoodMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const {
    handleIncrement,
    handleDecrement,
    foodCounts,
    restaurant,
    foods,
    fetchCartData,
    handleCheckout,
  } = useCartStore();

  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

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
        return totalPrice + food.hargaDiscount * count;
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

  useEffect(() => {
    // Fetch cart data when the component mounts
    fetchCartData().then(() => {
      setIsFetchCompleted(true);
    });
  }, [fetchCartData]);

  return (
    <div className="container mx-auto p-10">
      <div className="flex w-full items-center justify-center">
        {foods && (
          <button
            id="search"
            className="btn btn-ghost btn-circle mr-2"
            onClick={() => navigate(`/restaurant/${foods[0].restoId}`)}
          >
            <ArrowLeft className="text-primary" size={25} />
          </button>
        )}
        {restaurant && (
          <h2 className="text-2xl font-semibold">{restaurant.nama}</h2>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <div className="card w-[35rem] bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center mb-6">
              <BiSolidFoodMenu className="text-primary mr-4" size={30} />
              <h2 className="card-title">Your Order</h2>
            </div>
            {foods?.map((foodItem, index) => {
              const foodCount = foodCounts[foodItem._id] || 0;
              return foodCount > 0 ? (
                <div key={index}>
                  <div className="flex justify-between">
                    <div>
                      <div className="mb-4">
                        <span className="font-semibold">
                          {foodItem.makanan}
                        </span>
                      </div>
                      <p className="text-sm font-medium ml-auto">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(foodItem.hargaDiscount * foodCount)}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <figure>
                        <img
                          src={foodItem.gambarMakanan}
                          alt={foodItem.makanan}
                          className={`w-20 h-20 border object-cover bg-gray-100 rounded-xl transition-all duration-500 ease-in-out filter ${!imageLoaded ? "blur-lg" : ""
                            }`}
                          onLoad={() => {
                            setTimeout(() => {
                              setImageLoaded(true);
                            }, 100);
                          }}
                        />
                      </figure>
                      <div className="flex w-[110px] items-center justify-around">
                        <button
                          onClick={() =>
                            handleDecrement(foodItem._id, foodItem.restoId)
                          }
                          className="btn btn-xs btn-circle btn-primary"
                        >
                          <Minus size={15} strokeWidth={3} />
                        </button>
                        <span className="text-center">{foodCount}</span>
                        <button
                          onClick={() =>
                            handleIncrement(foodItem._id, foodItem.restoId)
                          }
                          className="btn btn-xs btn-circle btn-primary"
                        >
                          <Plus size={15} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
        {isFetchCompleted && !isFoodSelected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" />
            <dialog
              className="modal modal-bottom sm:modal-middle"
              open={!isFoodSelected}
            >
              <div className="modal-box">
                <h3 className="font-bold text-2xl">
                  Whooosh, empty cart it is
                </h3>
                <p className="py-4">
                  All items has been removed. Looking for other options?
                  FoodGuardian has many great restos you can try.
                </p>
                <div className="modal-action">
                  <div className="w-full">
                    <button
                      className="btn btn-primary btn-block normal-case text-lg"
                      onClick={() => navigate(-1)}
                    >
                      Back to resto page
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          </div>
        )}
        <div className="card w-[35rem] bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center mb-6">
              <BadgeDollarSign className="text-primary mr-4" size={30} />
              <h2 className="card-title">Payment Summary</h2>
            </div>
            <div className="flex justify-between">
              <div className="mb-4">
                <span className="font-semibold">Price</span>
              </div>

              <div>{formattedTotalPrice}</div>
            </div>
            <button
              className="bg-primary rounded-full p-4 w-40 text-white mx-auto"
              onClick={() => {
                const confirmation = window.confirm(
                  "Are you sure you want to proceed with the checkout?"
                );
                if (confirmation) {
                  console.log("checkout berhasil");
                  handleCheckout();
                  navigate("/transaction");
                } else {
                  console.log("checkout dibatalkan");
                  // Add any logic you want to execute if the checkout is canceled
                }
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
