import create, { SetState } from "zustand";
import Cookies from "js-cookie";

type UserData = {
  username: string;
  // Add other user-related properties here
};

type AuthState = {
  isAuthenticated: boolean;
  user: UserData | null;
};

type AuthActions = {
  login: (userData: UserData, auth_token: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthActions>(
  (set: SetState<AuthState & AuthActions>) => ({
    isAuthenticated: Cookies.get("auth_token") ? true : false,
    user: null,
    login: (userData, auth_token) => {
      // Set isAuthenticated to true and save token to cookies
      set((state) => ({
        ...state,
        isAuthenticated: true,
        user: userData,
      }));
      Cookies.set("auth_token", auth_token, { expires: 1 }); // Set cookie expiration as needed
    },
    logout: () => {
      // Set isAuthenticated to false and remove token from cookies
      set((state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
      }));
      Cookies.remove("auth_token");
    },
  })
);

export default useAuthStore;
