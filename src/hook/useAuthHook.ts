import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuthStore from "~/store/authStore";
import { axiosInstance } from "~/lib/axiosInstance";

const useAuthHook = () => {
    const authStore = useAuthStore(); // Access the auth store
    const { isAuthenticated, user, login, logout } = useAuthStore(); // Access isAuthenticated, user, and logout from the auth store
    console.log("IsAuthenticated:", isAuthenticated);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(
                "/users/login",
                userData
            );
            console.log("Sign In Success:", response.data);

            // Store the token in a cookie
            Cookies.set("auth_token", response.data.token, { expires: 1 }); // Cookie expires in 1 day

            console.log("Token:", response.data.token); // Log the token to the console

            // Call the login action from the auth store
            authStore.login(userData, response.data.token);

            // Handle successful sign in, such as setting user authentication state or redirecting the user.
            navigate("/");
        } catch (error) {
            console.error("Sign In Failed:", error);
            // Handle sign in failure, such as displaying an error message to the user.
        }
    };

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(
                '/users/signup',
                userData
            );
            console.log('Sign Up Success:', response.data);
            // Handle successful sign up, such as redirecting the user or showing a success message.
        } catch (error) {
            console.error('Sign Up Failed:', error);
            // Handle sign up failure, such as displaying an error message to the user.
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const fetchUserDataFromServer = async () => {
        try {
            const auth_token = Cookies.get("auth_token");
            const headers = {
                Authorization: `Bearer ${auth_token}`,
                "Content-Type": "application/json", // Set the content type if needed
            };
            const response = await axiosInstance.get(
                "/users/refreshToken",
                {
                    headers,
                }
            );

            const userData = response.data.data; // Adjust this based on the actual response structure
            console.log("tes", userData);
            localStorage.setItem("currentUser", JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle errors here, if necessary
        }
    };

    useEffect(() => {
        const auth_token = Cookies.get("auth_token");
        const userDataFromLocalStorage = localStorage.getItem("currentUser");

        const fetchData = async () => {
            if (auth_token && typeof auth_token === "string") {
                if (!userDataFromLocalStorage) {
                    try {
                        const userData = await fetchUserDataFromServer();
                        if (userData) {
                            login(userData, auth_token);
                        } else {
                            // Tangani jika data pengguna tidak dapat diambil dari server
                        }
                    } catch (error) {
                        // Tangani kesalahan pengambilan data pengguna dari server
                        console.error("Error fetching user data from server:", error);
                    }
                } else {
                    // Gunakan data pengguna dari localStorage jika ada
                    const parsedUserData = JSON.parse(userDataFromLocalStorage);
                    login(parsedUserData, auth_token);
                }
            } else {
                // Tangani kasus ketika auth_token tidak tersedia atau bukan string
                console.error("Invalid or missing auth_token.");
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        // Call the logout action from the auth store
        logout();

        // Clear the token from cookies
        Cookies.remove("auth_token");

        localStorage.removeItem("currentUser");

        // Refresh the page to apply changes
        window.location.reload();

        // Handle any other logout logic, such as redirecting the user
    };

    return {
        userData,
        showPassword,
        isAuthenticated,
        user,
        handleInputChange,
        handleSignIn,
        handleSignUp,
        handleLogout,
        togglePasswordVisibility,
    };
};

export default useAuthHook;
