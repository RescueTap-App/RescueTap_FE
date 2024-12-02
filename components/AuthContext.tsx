import React from "react";
import { authService, User, AuthTokens } from "@/services/auth-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userService } from "@/services/user-service";

interface AuthContextType {
  user: User | null;
  login: (phoneNumber: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = React.useState(false);

  React.useEffect(() => {
    const initAuth = async () => {
      try {
        const tokens = await authService.getTokens();
        const onboardingStatus = await AsyncStorage.getItem(
          "hasSeenOnboarding"
        );
        setHasSeenOnboarding(onboardingStatus === "true");

        if (tokens) {
          // Implement user data fetching using the access token
          // You might want to add an endpoint to fetch user data
          const response = await authService.refreshToken();
          // Update user data here
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (phoneNumber: string, password: string) => {
    const response = await authService.login(phoneNumber, password);
    setUser(response.user);
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) => {
    const response = await authService.register(data);
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setOnboardingStatus(false);
  };

  const setOnboardingStatus = async (value: boolean) => {
    await AsyncStorage.setItem("hasSeenOnboarding", value.toString());
    setHasSeenOnboarding(value);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        hasSeenOnboarding,
        setHasSeenOnboarding: setOnboardingStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

async function fetchUserData(accessToken: string): Promise<User | null> {
  // Implement user data fetching using the access token
  // This is just a placeholder implementation
  const user = await userService.getUserById("asdf");
  return user;
}
