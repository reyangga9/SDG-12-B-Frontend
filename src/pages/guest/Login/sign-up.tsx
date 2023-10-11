import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://sdg-12-b-backend-production.up.railway.app/api/users/signup',
                userData
            );
            console.log('Sign Up Success:', response.data);
            // Handle successful sign up, such as redirecting the user or showing a success message.
        } catch (error) {
            console.error('Sign Up Failed:', error);
            // Handle sign up failure, such as displaying an error message to the user.
        }
    };

    return (
        <form onSubmit={handleSignUp} className="space-y-4 font-medium">
            <div>
                <label className="label">
                    <span className="text-base label-text">Username</span>
                </label>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    placeholder="Your Username"
                    className="w-full input input-bordered"
                />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Email</span>
                </label>
                <input
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full input input-bordered"
                />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Password</span>
                </label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="w-full input input-bordered"
                />
            </div>
            <div>
                <button type="submit" className="btn btn-primary btn-block">
                    Register
                </button>
            </div>
        </form>
    );
};

export default SignUp;
