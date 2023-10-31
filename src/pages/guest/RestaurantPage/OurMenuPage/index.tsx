import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import hero2 from "~/assets/hero2.png";

interface Food {
  _id: string;
  makanan: string;
  tanggalExpired: string;
  gambarMakanan: string;
  harga: number;
  restoId: string;
  stokMakanan: number;
  discountPercentage: number;
  category: string[];
}

export const OurMenuPage = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sdg-12-b-backend-production.up.railway.app/api/food"
        );
        setFoods(response.data.data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Your hero section here */}
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
          <span>Our Menu</span>
        </div>
        <div className="flex flex-wrap gap-5 mt-10">
          {Array.isArray(foods) && foods.length > 0 ? (
            foods.map((food, index) => (
              <div key={index}>
                <div className="card w-72 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all duration-300">
                  <figure className="px-2 pt-2">
                    <img
                      src={food.gambarMakanan}
                      alt={food.makanan}
                      className="w-full h-60 object-cover bg-gray-100 rounded-xl"
                    />
                  </figure>
                  <div className="card-body px-3 py-3">
                    <h2 className="card-title">{food.makanan}</h2>
                    <p className="text-base font-medium">{food.harga}</p>
                    <button className="btn btn-primary normal-case text-base">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No menu items available</p>
          )}
        </div>
      </div>
    </>
  );
};
