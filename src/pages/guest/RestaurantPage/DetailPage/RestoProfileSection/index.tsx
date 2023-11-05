import React from "react";
import { SkeletonResto } from "~/components/SkeletonResto";
import { RestoProfileSectionProps } from "./types";

const RestoProfileSection: React.FC<RestoProfileSectionProps> = ({
    restaurant,
    setImageLoaded,
    imageLoaded,
    loading,
}) => {
    if (loading) {
        return <SkeletonResto />;
    }

    if (!restaurant) {
        return null;
    }

    return (
        <div className="flex justify-between space-x-7">
            <div className="flex flex-col w-full">
                <h2 className="text-2xl font-semibold">{restaurant.nama}</h2>
                {restaurant.category && (
                    <h3 className="text-lg text-neutral-600">
                        {restaurant.category.join(", ")}
                    </h3>
                )}
                <h3 className="text-lg text-neutral-600">
                    {restaurant.alamat}
                </h3>
            </div>
            <figure className="flex-none h-full">
                <img
                    src={restaurant.gambarRestaurant}
                    alt={restaurant.nama}
                    className={`w-40 h-40 border object-cover bg-gray-100 rounded-xl transition-all duration-500 ease-in-out filter ${!imageLoaded ? "blur-lg" : ""
                        }`}
                    onLoad={() => {
                        setTimeout(() => {
                            setImageLoaded(true);
                        }, 100);
                    }}
                />
            </figure>
        </div>
    );
};

export default RestoProfileSection;
