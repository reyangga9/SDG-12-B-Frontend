import create, { SetState } from 'zustand';
import Cookies from 'js-cookie';

type UserData = {
    username: string;
    // Add other user-related properties here
};

type AuthState = {
    isAuthenticated: boolean;
    user: UserData | null;
};

type AuthActions = {
    login: (userData: UserData, authToken: string) => void;
    logout: () => void;
};

const useAuthStore = create<AuthState & AuthActions>((set: SetState<AuthState & AuthActions>) => ({
    isAuthenticated: Cookies.get('authToken') ? true : false,
    user: null,
    login: (userData, authToken) => {
        // Set isAuthenticated to true and save token to cookies
        set((state) => ({
            ...state,
            isAuthenticated: true,
            user: userData,
        }));
        Cookies.set('authToken', authToken, { expires: 1 }); // Set cookie expiration as needed
    },
    logout: () => {
        // Set isAuthenticated to false and remove token from cookies
        set((state) => ({
            ...state,
            isAuthenticated: false,
            user: null,
        }));
        Cookies.remove('authToken');
    },
}));

export default useAuthStore;
