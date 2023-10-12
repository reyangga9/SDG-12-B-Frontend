import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const SignIn = () => {
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
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="w-full input input-bordered"
                />
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
