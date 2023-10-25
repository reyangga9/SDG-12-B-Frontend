// import { Link } from 'react-router-dom';
import { cardData } from './constants';
// import hero from '~/assets/hero.png';
import hero2 from '~/assets/hero2.png';

export const BestSellerPage = () => {
    return (
        <>
            <div className="hero h-96" style={{ backgroundImage: `url(${hero2})` }}>
                <div className="hero-content text-black">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">FoodGuardian</h1>
                        <h1 className="mb-5 text-2xl font-semibold">Eksplor  kumpulan rekomendasi yang kami buat untuk berbagai kebutuhanmu</h1>
                    </div>
                </div>
            </div>
            <div className='container mx-auto p-10'>
                <div className='text-center font-semibold text-4xl p-3'>
                    <span>Best Seller</span>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-5 mt-10'>
                    {cardData.map((card, index) => (
                        <div key={index}>
                            <div className="card  w-56 h-56 bg-base-100 border hover:shadow-xl mb-8 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                                <figure className="px-10 pt-10">
                                    <img src={card.image} alt={card.title} className="w-20" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{card.title}</h2>
                                </div>
                            </div>
                            <button className="btn btn-primary w-fill">Order Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};