import useSWR, { SWRResponse } from "swr";
import { axiosInstance } from "@/constants/api";
import { AxiosError, AxiosResponse } from "axios";

interface EmergencyContactData {
  _id: string;
  address: string;
  name: string;
  notify: boolean;
  number: string;
  relationship: string;
}
class EmergencyService {
  public async addEmergencyContact(
    userId: string,
    arg: {
      name: string;
      number: string;
      address: string;
      relationship: string;
      notify: boolean;
    }
  ): Promise<any | AxiosError> {
    try {
      const form = new FormData();
      for (let keys in arg) {
        // @ts-ignore
        form.append(keys, arg[keys]);
      }
      const response = await axiosInstance.post(
        `users/${userId}/emergency-contact`,
        form
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Error adding emergency contact"
      );
    }
  }

  public getEmergencyContact(arg: {
    userid: string;
    contactId: string;
  }): SWRResponse<{ emergencyContact: EmergencyContactData }, any, any> {
    return useSWR(`/users/${arg.userid}/emergency-contact/${arg.contactId}`);
  }

  /** Gets user emergency contacts */
  public getEmergencyContacts(
    userId: string
  ): SWRResponse<{ emergencyContacts: EmergencyContactData[] }, any, any> {
    return useSWR(`/users/${userId}/emergency-contacts`);
  }
}

export const emergencyService = new EmergencyService();

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
