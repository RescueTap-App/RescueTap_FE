import React from "react";
import { authService, User, AuthTokens } from "@/services/auth-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userService } from "@/services/user-service";
import { API_URL } from "@/constants/api";

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
  verifyOtp: (data: { id: string; token: string }) => Promise<void>;
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
          try {
            const response = await authService.refreshToken();
            const userData = await fetchUserData({
              userId: tokens.userId,
              accessToken: response.access_token,
            });
            if (userData) {
              setUser(userData);
            }
          } catch (error) {
            await logout();
            console.error("Token refresh failed:", error);
            // Handle token refresh failure (e.g., force logout)
          }
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

  const verifyOtp = async (data: { id: string; token: string }) => {
    const response = await authService.verifyOtp(data);
    // setUser(response.user);
    // TODO: set verification OTP
  };

  const logout = async () => {
    await authService.logout();
    await AsyncStorage.removeItem("userId");
    setUser(null);
    // setOnboardingStatus(false);
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
        verifyOtp,
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

const fetchUserData = async ({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: string;
}): Promise<User | null> => {
  // Implement your user data fetching logic here using the accessToken
  // Example using fetch:
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
