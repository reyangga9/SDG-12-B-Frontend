import { cardData, cardData2 } from './constants';
import hero2 from '~/assets/hero2.png';


const RecommendationPage = () => {
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
                    <span>Looking For Inspo ? Start Here</span>
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
                <div className='text-center font-semibold text-4xl p-3'>
                    <span>Why Order From FoodGuardian?</span>
                </div>
                <div className="justify-center items-center flex gap-10 p-10 w-full bg-base-100 rounded-xl shadow-xl mb-8">
                    {cardData2.map((card2, index) => (
                        <figure key={index} className={`w-60 h-25 ${index !== 3 ? 'border-r-2' : ''} px-10`}>
                            <img src={card2.image} className="object-cover" alt={`Card ${index}`} />
                        </figure>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RecommendationPage;
