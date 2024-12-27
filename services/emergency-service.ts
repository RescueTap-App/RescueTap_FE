import useSWR, { SWRResponse } from "swr";
import { axiosInstance } from "@/constants/api";
import axios, { AxiosError, AxiosResponse } from "axios";

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
      const response = await axiosInstance.post(
        `users/${userId}/emergency-contact`,
        arg
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

  async updateEmergencyContact(arg: {
    userid: string;
    index: number;
    body: {
      name: string;
      number: string | number;
      address: string;
      relationship: string;
      notify: boolean;
    };
  }) {
    try {
      const response = await axiosInstance.put(
        `/users/${arg.userid}/emergency-contact/${arg.index}`,
        arg.body
      );
      return response.data();
    } catch (error) {
      console.debug("error updating contact: ", error);
      return null;
    }
  }
}

export const emergencyService = new EmergencyService();
