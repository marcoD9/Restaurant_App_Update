import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { LoginResponse, User } from "@/types";
import { login, fetchUserById, logout, createAccount } from "../api.ts";
import { ReactNode } from "react";
import AuthToastManager from "@/components/AuthToastManager.tsx";

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  user: User | null;
  token: string | null;
  fetchUserData: (token: string, userId: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  onError: (message: string) => void;
  error: string | null;
  success: string | null;
  info: string | null;
  setSuccess: (message: string | null) => void;
  setInfo: (message: string | null) => void;
  clearSuccess: () => void;
  clearInfo: () => void;
  clearError: () => void;
  createUser: (
    username: string,
    password: string,
    name: string,
    email: string,
    phoneNumber: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const onError = (message: string) => {
    setError(message);
    console.error(message);
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(null);
  };

  const clearInfo = () => {
    setInfo(null);
  };

  // Fetch User
  const fetchUserData = useCallback(async (token: string, userId: string) => {
    try {
      const userData = await fetchUserById(userId, token);
      setUser(userData);
    } catch (fetchError: unknown) {
      if (fetchError instanceof Error) {
        setError(fetchError.message);
      } else {
        setError("Failed to fetch user data.");
      }
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && user === null) {
      // If token truthy and user null try to fetch user
      const id = localStorage.getItem("userId");
      if (id) {
        fetchUserData(storedToken, id);
      }
    }
  }, [fetchUserData, user]);

  //login handler
  const loginHandler = async (username: string, password: string) => {
    try {
      const response: LoginResponse = await login(username, password);
      setToken(response.token);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userId", response.user.id);
      await fetchUserData(response.token, response.user.id);
      setSuccess("Login successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const logoutHandler = () => {
    setUser(null);
    setToken(null);
    setSuccess("Logout!");
    logout();
  };

  // Create User
  const createUser = async (
    username: string,
    password: string,
    name: string,
    email: string,
    phoneNumber: string
  ) => {
    try {
      const newUser = await createAccount(
        username,
        password,
        name,
        email,
        phoneNumber
      );
      setUser(newUser);
      setSuccess("User successfully created!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknwon error occurred.");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: loginHandler,
        logout: logoutHandler,
        setUser,
        onError,
        error,
        clearError,
        createUser,
        fetchUserData,
        success,
        info,
        setSuccess,
        setInfo,
        clearSuccess,
        clearInfo,
      }}
    >
      {children}
      <AuthToastManager />
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
