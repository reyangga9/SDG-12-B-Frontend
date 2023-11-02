import { useState, useEffect } from "react";
import hero2 from "~/assets/hero2.png";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Restaurant } from "./types";
import { SkeletonCardResto } from "~/components/SkeletonCardResto";
import { axiosInstance } from "~/lib/axiosInstance";

export const OurShopPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/restaurant/random/");
      setRestaurants(response.data.restaurant);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="hero h-96" style={{ backgroundImage: `url(${hero2})` }}>
        <div className="hero-content text-black">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">FoodGuardian</h1>
            <h1 className="mb-5 text-2xl font-semibold">
              Explore our collection of recommended restaurants for your various
              needs
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-32 py-10">
        <div className="font-semibold text-4xl">
          <span>Our Shops</span>
        </div>
        <div className='flex flex-wrap gap-5 mt-10'>
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <SkeletonCardResto />
              </div>
            ))
          ) : (
            restaurants.map((restaurant, index) => (
              <Link key={index} to={(`/restaurant/${restaurant._id}`)}>
                <div className="card w-72 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all transform hover:scale-[1.02] duration-300 ease-in-out">
                  <figure className="px-2 pt-2">
                    <img
                      src={restaurant.gambarRestaurant}
                      alt={restaurant.nama}
                      className={`w-full h-60 border object-cover bg-gray-100 rounded-xl transition-all duration-500 ease-in-out filter ${!imageLoaded ? 'blur-lg' : ''}`}
                      onLoad={() => {
                        setTimeout(() => {
                          setImageLoaded(true);
                        }, 100); // You can adjust the delay (in milliseconds) as needed
                      }}
                    />
                    <div className="absolute transform translate-y-24 right-3 bg-white px-2 py-1 rounded-full shadow-lg">
                      <div className="flex items-center gap-2">
                        <Star size={20} fill='yellow' className='text-yellow-500' />
                        <span className="text-md font-semibold">{restaurant.avgRating}</span>
                      </div>
                    </div>
                  </figure>
                  <div className="card-body px-3 py-3">
                    <h2 className="card-title">{restaurant.nama}</h2>
                    {restaurant.category && <p className="text-sm">{restaurant.category.join(', ')}</p>}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};
