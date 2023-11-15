import { SkeletonCardFood } from "~/components/SkeletonCardFood";
import { MenuSectionProps } from "./types";
import { Minus, Plus } from "lucide-react";
import useAuthHook from "~/hook/useAuthHook";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Import locale for Indonesian language

const MenuSection: React.FC<MenuSectionProps> = ({
  foods,
  foodCounts,
  handleIncrement,
  handleDecrement,
  imageLoaded,
  setImageLoaded,
}) => {
  const { isAuthenticated } = useAuthHook();
  dayjs.locale("id"); // Set locale to Indonesian
  const currentDate = dayjs(); // Get the current date

  return (
    <div className="flex flex-wrap gap-5 mt-20">
      {!foods || foods.length === 0 ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <SkeletonCardFood />
          </div>
        ))
      ) : (
        foods.map((food, index) => {
          const isOutOfStock = dayjs(food.tanggalExpired) < currentDate;
          const addButtonClasses = isOutOfStock
            ? "btn btn-base-300 normal-case text-base"
            : "btn btn-primary normal-case text-base";

          return (
            <div key={index} className="relative">
              <div className="card w-72 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transition-all duration-300">
                <figure className="px-2 pt-2">
                  <img
                    src={food.gambarMakanan}
                    alt={food.makanan}
                    className={`w-full h-60 border object-cover bg-gray-100 rounded-xl transition-all duration-500 ease-in-out ${!imageLoaded ? "blur-lg" : ""
                      } ${isOutOfStock ? "filter grayscale" : ""}`}
                    onLoad={() => {
                      setTimeout(() => {
                        setImageLoaded(true);
                      }, 100);
                    }}
                  />
                </figure>
                <div className="card-body px-3 py-3 ">
                  <h2 className="text-[22px] font-semibold h-10">
                    {food.makanan}
                  </h2>
                  {isOutOfStock ? (
                    <div className="flex mt-16" />
                  ) : (
                    <div>
                      <div className="flex mt-10">
                        <p className="text-base font-medium">Dijual sampai:</p>
                        <p className="text-base font-medium">
                          <span>
                            {dayjs(food.tanggalExpired).format("D MMMM YYYY")}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="badge py-3 bg-red-100 text-red-500 font-semibold text-lg">
                          {food.discountPercentage}%
                        </div>
                        <p className="text-lg font-semibold line-through text-neutral-500">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(food.harga)}
                        </p>
                      </div>
                    </div>
                  )}
                  <p
                    className={`text-2xl font-semibold mt-2 ${isOutOfStock ? "text-red-500" : ""
                      }`}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(food.hargaDiscount)}
                  </p>
                  {foodCounts[food._id] > 0 ? (
                    <div className="flex justify-center items-center mt-2">
                      <div className="grid grid-cols-3 items-center gap-1">
                        <button
                          className="btn btn-primary btn-circle"
                          onClick={() =>
                            handleDecrement(food._id, food.restoId)
                          }
                        >
                          <Minus size={20} strokeWidth={3} />
                        </button>
                        <span className="text-center text-lg">
                          {foodCounts[food._id]}
                        </span>
                        <button
                          className="btn btn-primary btn-circle"
                          onClick={() =>
                            handleIncrement(food._id, food.restoId)
                          }
                        >
                          <Plus size={20} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className={addButtonClasses}
                      onClick={() => {
                        if (isAuthenticated) {
                          handleIncrement(food._id, food.restoId);
                        } else {
                          alert(
                            "Authentication is required to add items to the cart."
                          );
                          window.location.href = "/login"; // Navigate to the login page
                        }
                      }}
                      disabled={isOutOfStock}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};


export default MenuSection;
