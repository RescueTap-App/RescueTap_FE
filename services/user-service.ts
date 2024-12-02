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
}

export const userService = new UserService();
