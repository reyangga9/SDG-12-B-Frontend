import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

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
                <div className='relative mt-2'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        placeholder="Enter Password"
                        className="w-full input input-bordered"
                    />
                    <button
                        type="button"
                        id="showPassword"
                        name="showPassword"
                        aria-label="showPassword"
                        className="absolute inset-y-0 right-0 flex items-center p-3 text-black"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                    </button>
                </div>
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
