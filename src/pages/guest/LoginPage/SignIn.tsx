import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import useAuthStore from '~/store/authStore'; // Adjust the import path accordingly
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const authStore = useAuthStore(); // Access the auth store

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://sdg-12-b-backend-production.up.railway.app/api/users/login',
                userData
            );
            console.log('Sign In Success:', response.data);

            // Store the token in a cookie
            Cookies.set('authToken', response.data.token, { expires: 1 }); // Cookie expires in 1 day

            console.log('Token:', response.data.token); // Log the token to the console


            // Call the login action from the auth store
            authStore.login(userData, response.data.token);

            navigate('/');

            // Handle successful sign in, such as setting user authentication state or redirecting the user.
        } catch (error) {
            console.error('Sign In Failed:', error);
            // Handle sign in failure, such as displaying an error message to the user.
        }
    };

    return (
        <form onSubmit={handleSignIn} className="space-y-4 font-medium">
            <div>
                <label className="label">
                    <span className="text-base label-text">Username</span>
                </label>
                <input
                    type="text"
                    name="username" // API menggunakan field "username" untuk email, sesuaikan nama field jika berbeda dengan API
                    value={userData.username}
                    onChange={handleInputChange}
                    placeholder="Enter Username"
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
            {/* Tambahkan fitur "Lupa Password" jika diperlukan */}
            {/* <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">
          Forget Password?
      </a> */}
            <div>
                <button type="submit" className="btn btn-primary btn-block">
                    Login
                </button>
            </div>
        </form>
    );
};

export default SignIn;
