import { SkeletonCardFood } from "~/components/SkeletonCardFood";
import { MenuSectionProps } from "./types";
import { Minus, Plus } from "lucide-react";
import useAuthHook from "~/hook/useAuthHook";

const MenuSection: React.FC<MenuSectionProps> = ({
    foods,
    foodCounts,
    handleIncrement,
    handleDecrement,
    imageLoaded,
    setImageLoaded,
}) => {
    const { isAuthenticated } = useAuthHook();
    return (
        <div className="flex flex-wrap gap-5 mt-20">
            {!foods || foods.length === 0
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index}>
                        <SkeletonCardFood />
                    </div>
                ))
                : foods.map((food, index) => (
                    <div key={index}>
                        <div className="card w-72 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all duration-300">
                            <figure className="px-2 pt-2">
                                <img
                                    src={food.gambarMakanan}
                                    alt={food.makanan}
                                    className={`w-full h-60 border object-cover bg-gray-100 rounded-xl transition-all duration-500 ease-in-out filter ${!imageLoaded ? "blur-lg" : ""
                                        }`}
                                    onLoad={() => {
                                        setTimeout(() => {
                                            setImageLoaded(true);
                                        }, 100);
                                    }}
                                />
                            </figure>
                            <div className="card-body px-3 py-3">
                                <h2 className="card-title">{food.makanan}</h2>
                                <p className="text-base font-medium">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(food.harga)}
                                </p>
                                {foodCounts[food._id] > 0 ? (
                                    <div className="flex justify-center items-center mt-2">
                                        <div className="grid grid-cols-3 items-center gap-1">
                                            <button
                                                className="btn btn-primary btn-circle"
                                                onClick={() => handleDecrement(food._id)}
                                            >
                                                <Minus size={20} strokeWidth={3} />

                                            </button>
                                            <span className="text-center text-lg">{foodCounts[food._id]}</span>
                                            <button
                                                className="btn btn-primary btn-circle"
                                                onClick={() => handleIncrement(food._id)}
                                            >
                                                <Plus size={20} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        className="btn btn-primary normal-case text-base"
                                        onClick={() => {
                                            if (isAuthenticated) {
                                                handleIncrement(food._id);
                                            } else {
                                                alert("Authentication is required to add items to the cart.");
                                                window.location.href = "/login"; // Navigate to the login page
                                            }
                                        }}
                                    >
                                        Add
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default MenuSection;
