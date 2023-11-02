import create, { SetState } from 'zustand';

type UserData = {
    username: string;
    // Add other user-related properties here
};

type AuthState = {
    isAuthenticated: boolean;
    user: UserData | null;
    token: string | null;
};

type AuthActions = {
    login: (userData: UserData, authToken: string) => void;
    logout: () => void;
};

const useAuthStore = create<AuthState & AuthActions>((set: SetState<AuthState & AuthActions>) => ({
    isAuthenticated: false,
    user: null,
    token: null,
    login: (userData, authToken) => {
        set((state) => ({
            ...state,
            isAuthenticated: true,
            user: userData,
            token: authToken,
        }));
    },
    logout: () => {
        set((state) => ({
            ...state,
            isAuthenticated: false,
            user: null,
            token: null,
        }));
    },
}));

export default useAuthStore;
