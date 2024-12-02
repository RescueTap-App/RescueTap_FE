import useSWR, { SWRResponse } from "swr";
import { axiosInstance } from "@/constants/api";
import { AxiosError, AxiosResponse } from "axios";
class EmergencyService {
  public async addEmergencyContact(
    name: string,
    phone: string
  ): Promise<AxiosResponse<any, any> | AxiosError> {
    try {
      const response = await axiosInstance.post("/asdfsdafdsf", {
        name,
        phone,
      });
      return response;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Error adding emergency contact"
      );
    }
  }

  public asyncgetEmergencyContact(name: string): SWRResponse<any, any, any> {
    return useSWR("/dasfdsf");
  }
}

// class EmergencyService {
//   private static instance: EmergencyService;
//   private emergencyContacts: { [key: string]: string } = {};

//   private constructor() {}

//   public static getInstance(): EmergencyService {
//     if (!EmergencyService.instance) {
//       EmergencyService.instance = new EmergencyService();
//     }
//     return EmergencyService.instance;
//   }

//   public addEmergencyContact(name: string, phone: string): void {
//     this.emergencyContacts[name] = phone;
//   }

//   public getEmergencyContact(name: string): string | undefined {
//     return this.emergencyContacts[name];
//   }
// }

// export const emergencyService = EmergencyService.getInstance();
