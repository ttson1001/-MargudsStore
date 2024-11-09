import { create } from "zustand";

// Define the User type (optional for better type safety)
interface User {
  userID: string;
  userName: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  refreshToken: string;
  roles: string[];
  token: string;
}

interface UserStore {
  user: User; // User object or null
  setUser: (userData: User) => void;
  clearUser: () => void;
}

// Create the Zustand store
const useUserStore = create<UserStore>((set) => {
  // Get initial state from localStorage if available
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser
    ? JSON.parse(storedUser)
    : {
        userID: "",
        userName: "",
        email: "",
        name: "",
        address: "",
        phone: "",
        image: "",
        refreshToken: "",
        roles: [],
        token: "",
      };

  return {
    user: initialUser, // Start with the stored user or null
    setUser: (userData: User) => {
      // Save to state and localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      set({ user: userData });
    },
    clearUser: () => {
      // Clear from state and localStorage
      localStorage.removeItem("user");
      set({
        user: {
          userID: "",
          userName: "",
          email: "",
          name: "",
          address: "",
          phone: "",
          image: "",
          refreshToken: "",
          roles: [],
          token: "",
        },
      });
    },
  };
});

export default useUserStore;
