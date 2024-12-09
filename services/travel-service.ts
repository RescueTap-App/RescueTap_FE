import { API_URL, axiosInstance } from "@/constants/api";
import { AxiosInstance } from "axios";
import useSWR from "swr";

class TravelService {
  public getAllTravels() {
    return useSWR(`/travels`, {});
  }

  public getTravelById(id: string) {
    return useSWR(`/travels/${id}`, {});
  }

  public async createTravel(params: {
    userId: string;
    driverId: string;
    isConfirmed: boolean;
    rejectionReason?: string;
  }) {
    try {
      const response = await axiosInstance.post(`/travels`, params);
      return response.data;
    } catch (error) {
      console.debug(error);
      return null; // Return null or handle error as needed
    }
  }

  public getTravelByUser(id: string) {
    return useSWR(`/travels/user/${id}`, {});
  }
}

export const travelService = new TravelService();
