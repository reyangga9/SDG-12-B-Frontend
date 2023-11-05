import { useParams } from 'react-router-dom';
import useCartHook from '~/hook/useCartHook';
import useRestaurantHook from '~/hook/useRestaurantHook';
import { useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';

const CartSection = () => {
    const { handleIncrement, handleDecrement, foodCounts } = useCartHook();
    let { id } = useParams();
    const { restaurant, foods } = useRestaurantHook('single', id);

    const calculateTotalFoodCount = useCallback(() => {
        return Object.keys(foodCounts).reduce(
            (total, foodId) => total + foodCounts[foodId],
            0
        );
    }, [foodCounts]);

    const calculateTotalPrice = useCallback(() => {
        return foods?.reduce((totalPrice, food) => {
            const foodCount = foodCounts[food._id] || 0;
            return totalPrice + foodCount * food.harga;
        }, 0);
    }, [foodCounts, foods]);

    const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(calculateTotalPrice());

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
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-[26rem] p-2 bg-white shadow">
                <div className="card-body">
                    <span className="font-semibold text-lg">Your Order</span>
                    <h2 className="text-sm text-neutral-600 -mt-2 mb-5">{restaurant?.nama}</h2>
                    {foods?.map((food, index) => {
                        const foodCount = foodCounts[food._id] || 0;
                        return foodCount > 0 ? (
                            <div key={index} className="grid grid-cols-3 mt-2">
                                <span className='font-semibold'>{food.makanan}</span>
                                <div className="grid grid-cols-3 items-center gap-3 ml-10">
                                    <button onClick={() => handleDecrement(food._id)} className=" btn btn-xs btn-circle btn-primary">
                                        <Minus size={15} strokeWidth={3} />
                                    </button>
                                    <span className="text-center">{foodCount}</span>
                                    <button onClick={() => handleIncrement(food._id)} className="btn btn-xs btn-circle btn-primary">
                                        <Plus size={15} strokeWidth={3} />
                                    </button>
                                </div>

                                <p className="text-sm font-medium ml-auto">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(food.harga)}
                                </p>
                            </div>
                        ) : null;
                    })}
                    <div className="card-actions mt-32">
                        <span className="font-bold text-base">Total Price:</span>
                        <span className="font-bold text-base ml-auto">{formattedTotalPrice}</span>
                        <button className="btn btn-primary btn-block">
                            Continue to checkout
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CartSection;
