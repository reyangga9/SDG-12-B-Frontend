import React from 'react';
import hero from '../assets/hero.png';
import inspo1 from '../assets/our-menu.png';
import inspo2 from '../assets/our-shop.png';
import inspo3 from '../assets/best-seller.png';
import inspo4 from '../assets/most-loved.png';
import inspo5 from '../assets/24-hours.png';

const cardData = [
    { image: inspo1, title: 'Our Menu!' },
    { image: inspo2, title: 'Our Shop!' },
    { image: inspo3, title: 'Best Seller' },
    { image: inspo4, title: 'Most Loved' },
    { image: inspo5, title: '24 Hours' },
];

const HomePage = () => {
    return (
        <>
            <div className="hero h-96" style={{ backgroundImage: `url(${hero})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Welcome! Join us in our mission to discover easy ways to rescue food, cut costs, and protect our planet.</p>
                        <button className="btn btn-primary">Take Action and Save Food</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-5 mt-10'>
                {cardData.map((card, index) => (
                    <div key={index} className="card  w-56 h-56 bg-base-100 shadow-xl transition duration-150 hover:bg-base-200 mb-8">
                        <figure className="px-10 pt-10">
                            <img src={card.image} alt={card.title} className="w-20" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{card.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HomePage;
