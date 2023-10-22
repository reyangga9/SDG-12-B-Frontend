import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/FoodGuardian-logo.png';
import pattern from '~/assets/foodpattern.jpg';
import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [isOpenModal, setOpenModal] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const openModal = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        // Add the 'overflow-hidden' class to the body element when the component mounts
        document.body.classList.add('overflow-hidden');

        // Remove the 'overflow-hidden' class from the body element when the component unmounts
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    return (
        <>
            <div className="bg-primary" style={{ backgroundImage: `url(${pattern})`, backgroundBlendMode: `multiply` }}>
                <div className="flex justify-center items-center h-screen px-5">
                    <div className="card w-full max-w-xl bg-base-100 shadow-xl">
                        <div className='flex p-5'>
                            <figure className='grow justify-center items-center ml-5'>
                                <img src={logo} alt="Shoes" className="w-52" />
                            </figure>
                            <div className="card-actions justify-end">
                                <button className="btn btn-square btn-sm" onClick={openModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {showForm ? <SignUp /> : <SignIn />}
                            <div>
                                <span className="text-xs text-gray-600 hover:underline hover:text-blue-600" onClick={toggleForm}>
                                    {showForm ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpenModal &&
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <dialog className="modal modal-bottom sm:modal-middle" open={isOpenModal} onClose={closeModal}>
                        <div className="modal-box">
                            <h3 className="font-bold text-2xl">Sure you wanna leave?</h3>
                            <p className="py-4">Just a heads-up: if you do, you’ll have to repeat the login process from the start.</p>
                            <div className="modal-action">
                                <Link to="/">
                                    <button className="btn btn-primary btn-block" onClick={closeModal}>Yes, Leave</button>
                                </Link>
                                {/* No, Stay button will close the modal */}
                                <button className="btn" onClick={closeModal}>No, Stay</button>
                            </div>
                        </div>
                    </dialog>
                </div>
            }
        </>
    );
};

export default LoginPage;
