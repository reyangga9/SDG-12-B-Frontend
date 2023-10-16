import { cardData, cardData2 } from './constants';
import image from '~/assets/about-us1.png';

const AboutUsPage = () => {
    return (
        <>
            <div className='container mx-auto p-10'>
                <div className='flex gap-10 justify-center items-center'>
                    <figure>
                        <img src={image} className='rounded-lg' />
                    </figure>
                    <div className='w-1/3 flex flex-col gap-5'>
                        <span className='text-5xl font-medium'>
                            We combat food waste to provide a sustainable solution for your you.
                        </span>
                        <span className='font-medium'>
                            Our journey began with a vision to establish a distinctive culinary experience that fuses sustainability, exceptional service, and a lively atmosphere. Committed to our city's rich culinary heritage, we strive to respect our local roots while infusing a global commitment to reducing food waste.
                        </span>
                        <span>
                            At Place we believe that dining is not merely about the food but about the holistic experience. Our team, celebrated for their warmth and commitment, endeavors to make each visit a memorable occasion, all while championing our mission to combat food waste.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsPage;
