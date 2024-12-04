import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@/constants/api";
// const API_URL = "https://plankton-app-nj7zb.ondigitalocean.app";

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  verified: boolean;
  role: string;
  emergencyContact?: {
    name: string;
    number: string;
    address: string;
    relationship: string;
    notify: boolean;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
}

export interface VerifyOtpResponse {
  message: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    // "password": "$2a$10$WrN3wVQkzK22gLy/kr3r4ujNn4Y.TQ0R44BnQl0vQpcTqVYI1QLS2",
    verified: boolean;
    role: "user";
    emergencyContact: any[];
    // "createdAt": "2024-11-18T16:10:15.533Z",
    // "updatedAt": "2024-11-18T16:10:15.533Z",
    // "__v": 0
  };
}

class AuthService {
  private async setTokens(tokens: Partial<AuthTokens>) {
    if (tokens.access_token) {
      await AsyncStorage.setItem("accessToken", tokens.access_token);
    }
    if (tokens.refresh_token) {
      await AsyncStorage.setItem("refreshToken", tokens.refresh_token);
    }
  }
  async getTokens(): Promise<AuthTokens | null> {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      return { access_token: accessToken, refresh_token: refreshToken };
    }
    return null;
  }

  async login(phoneNumber: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/auth/login`,
        {
          phoneNumber,
          password,
        }
      );
      await this.setTokens(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
      throw error;
    }
  }

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }): Promise<RegisterResponse> {
    try {
      const response = await axios.post<RegisterResponse>(
        `${API_URL}/users/signUp`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  }

  async verifyOtp(data: { id: string; token: string }) {
    // /users/verifyToken/:token?id=674157c9cab5b315a500be07
    try {
      const response = await axios.post(
        `${API_URL}/users/verifyToken/${data.token}?id=${data.id}`
      );
      return response.data as { message: string };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw error;
    }
  }

  async requestNewOtp(id: string) {
    try {
      const response = await axios.post(`${API_URL}/users/resendOtp/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw error;
    }
  }

  async refreshToken(): Promise<AuthTokens> {
    const tokens = await this.getTokens();
    if (!tokens) throw new Error("No refresh token available");

    try {
      const response = await axios.post<AuthTokens>(`${API_URL}/auth/refresh`, {
        refresh_token: tokens.refresh_token,
      });
      await this.setTokens(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Token refresh failed"
        );
      }
      throw error;
    }
  }
}

export const authService = new AuthService();
