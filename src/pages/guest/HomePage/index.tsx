import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cardData, cardData2 } from "./constants";
import hero from "~/assets/hero.png";
import hero2 from "~/assets/hero2.png";

import useCartStore from "~/store/cartStore";

const HomePage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchCartData = useCartStore((state) => state.fetchCartData);

  useEffect(() => {
    // Fetch cart data when the component mounts
    fetchCartData();
  }, [fetchCartData]);

  return (
    <>
      <div className="hero h-96" style={{ backgroundImage: `url(${hero})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Welcome! Join us in our mission to discover easy ways to rescue
              food, cut costs, and protect our planet.
            </p>
            <button className="btn btn-primary">
              Take Action and Save Food
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-10">
        <div className="text-center font-semibold text-4xl p-3">
          <span>Looking For Inspo ? Start Here</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5 mt-10">
          {cardData.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="card !rounded-xl w-56 h-full bg-base-100 border hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:border-none mb-8 transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
            >
              <figure
                className={`px-10 pt-10   transition-all duration-500 ease-in-out filter ${!imageLoaded ? "blur-lg" : ""
                  }`}
                onLoad={() => {
                  setTimeout(() => {
                    setImageLoaded(true);
                  }, 100); // You can adjust the delay (in milliseconds) as needed
                }}
              >
                <img src={card.image} alt={card.title} className="w-20" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{card.title}</h2>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center font-semibold text-4xl p-3">
          <span>Why Order From FoodGuardian?</span>
        </div>
        <div className="justify-center items-center border flex gap-10 p-10 w-full bg-base-100 rounded-xl transition-all duration-500 hover:drop-shadow-2xl mb-8">
          {cardData2.map((card2, index) => (
            <figure
              key={index}
              className={`w-60 h-25 ${index !== 3 ? "border-r-2" : ""
                } px-10 transition-all duration-500 ease-in-out filter ${!imageLoaded ? "blur-lg" : ""
                }`}
              onLoad={() => {
                setTimeout(() => {
                  setImageLoaded(true);
                }, 100); // You can adjust the delay (in milliseconds) as needed
              }}
            >
              <img
                src={card2.image}
                className="object-cover"
                alt={`Card ${index}`}
              />
            </figure>
          ))}
        </div>
      </div>
      <div className="hero h-96" style={{ backgroundImage: `url(${hero2})` }}>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Are you ready to order with the best deals?
            </h1>
            <button className="btn btn-primary">PROCEED TO ORDER</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
