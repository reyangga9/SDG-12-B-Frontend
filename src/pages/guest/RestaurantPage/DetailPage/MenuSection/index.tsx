import React from "react";
import { SkeletonCardFood } from "~/components/SkeletonCardFood";
import { MenuSectionProps } from "./types";

const MenuSection: React.FC<MenuSectionProps> = ({
    foods,
    foodCounts,
    handleIncrement,
    handleDecrement,
    imageLoaded,
    setImageLoaded,
}) => {
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
                                        <button
                                            className="btn btn-primary btn-circle"
                                            onClick={() => handleDecrement(food._id)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{foodCounts[food._id]}</span>
                                        <button
                                            className="btn btn-primary btn-circle"
                                            onClick={() => handleIncrement(food._id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="btn btn-primary normal-case text-base"
                                        onClick={() => handleIncrement(food._id)}
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
