import { axiosInstance } from "@/constants/api";

// Global Axios fetcher for SWR
export const fetcher = async (url: string, config = {}) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error: any) {
    // Handle and throw errors appropriately
    throw error.response?.data || error.message;
  }
};
