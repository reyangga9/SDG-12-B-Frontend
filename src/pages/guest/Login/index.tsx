import { useState } from 'react';
import logo from '~/assets/FoodGuardian-logo.png';
import SignIn from './sign-in';
import SignUp from './sign-up';

const LoginPage = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <div className="bg-primary">
                <div className="flex justify-center items-center h-screen">
                    <div className="card w-2/5 bg-base-100 shadow-xl">
                        <div className='flex items-center justify-between p-5'>
                            <figure>
                                <img src={logo} alt="Shoes" className="w-40" />
                            </figure>
                            <div className="card-actions justify-end">
                                <button className="btn btn-square btn-sm">
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
        </>
    );
};

export default LoginPage;
