import { useEffect, useState } from 'react';
import logo from '~/assets/FoodGuardian-logo.png';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const openModal = () => {
        const modalElement = document.getElementById('my_modal_5') as HTMLDialogElement | null;

        if (modalElement) {
            modalElement.showModal();
        } else {
            console.error("Modal element not found!");
        }
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
            <div className="bg-primary">
                <div className="flex justify-center items-center h-screen">
                    <div className="card w-2/5 bg-base-100 shadow-xl">
                        <div className='flex p-5'>
                            <figure className='grow justify-center items-center ml-5'>
                                <img src={logo} alt="Shoes" className="w-60" />
                            </figure>
                            <div className="card-actions justify-end">
                                <button className="btn btn-square btn-sm" onClick={openModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-2xl">Sure you wanna leave?</h3>
                                        <p className="py-4">Just a heads-up: if you do, you’ll have to repeat the login process from the start.</p>
                                        <div className="modal-action">
                                            <Link to="/">
                                                <button className="btn btn-primary btn-block">Yes, Leave</button>
                                            </Link>
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn">No, Stay</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
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
        </>
    );
};

export default LoginPage;
