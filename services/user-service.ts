import axios from "axios";
import type { User } from "./auth-service";
import { API_URL } from "@/constants/api";

export interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  verified: boolean;
  role: "user";
  address?: string;
  emergencyContact: {
    name: string;
    number: string;
    address: string;
    relationship: string;
    notify: boolean;
    _id: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
class UserService {
  async getUserById(userId: string): Promise<User | null> {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  }

  async uploadProfilePhoto(form: FormData): Promise<{ data: string }> {
    const response = await axios.post(`${API_URL}/upload`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = response.data;
    return data?.data;
  }

  async updateUserInfo(
    userId: string,
    userInfo: Pick<
      UserInfo,
      "firstName" | "lastName" | "phoneNumber" | "address"
    >
  ): Promise<User | null> {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}`, userInfo);
      return response.data;
    } catch (error) {
      console.error("Error updating user info:", error);
      return null;
    }
  }
}

export const userService = new UserService();
