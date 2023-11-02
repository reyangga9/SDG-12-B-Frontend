import image1 from '~/assets/about-us1.png';
import image2 from '~/assets/about-us2.png';
import { useState } from 'react';


const AboutUsPage = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            <div className='container mx-auto p-10'>
                <div className='flex gap-40 justify-center items-center'>
                    <figure className={`transition-all duration-500 ease-in-out filter ${!imageLoaded ? ' blur-lg' : ''}`} onLoad={() => {
                        setTimeout(() => {
                            setImageLoaded(true);
                        }, 100); // You can adjust the delay (in milliseconds) as needed
                    }}>
                        <img src={image1} className='rounded-lg' />
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
            </div >
            <div className='bg-neutral-100 p-10 flex gap-40 justify-center items-center'>
                <div className='w-1/3 flex flex-col gap-5'>
                    <span className='text-5xl font-medium'>
                        A little information for our valuable guest
                    </span>
                    <span className='font-medium'>
                        At Place we believe that dining is not merely about the food but about the holistic experience. Our team, celebrated for their warmth and commitment, endeavors to make each visit a memorable occasion, all while championing our mission to combat food waste.
                    </span>
                </div>
                <figure className={`transition-all duration-500 ease-in-out filter ${!imageLoaded ? ' blur-lg' : ''}`} onLoad={() => {
                    setTimeout(() => {
                        setImageLoaded(true);
                    }, 100); // You can adjust the delay (in milliseconds) as needed
                }}>
                    <img src={image2} className='rounded-lg' />
                </figure>
            </div>
        </>
    );
};

export default AboutUsPage;
