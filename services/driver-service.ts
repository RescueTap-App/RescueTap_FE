import useSWR, { SWRResponse } from "swr";
import { API_URL } from "@/constants/api";
import { axiosInstance } from "@/constants/api";

interface Driver {
  driverName: string;
  registrationDate: Date;
  status: "Active" | any;
  plateNumber: string;
  vehicle: string;
  image: string;
  driverId: string;
  licenseNumber: string;
  phoneNumber: string;
  emailAddress: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  homeAddress: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: string;
  insuranceInformation: string;
  password: string;
  profilePicture: string;
  numberOfTrips: number;
  termsAndConditionAgreement: boolean;
  privacyConsent: boolean;
}

interface DriverResponse {
  numberOfTrips: number;
  termsAndConditionsAgreement: boolean;
  privacyConsent: boolean;
  _id: string;
  driverName: string;
  contactInformation: string;
  status: "Active" | any;
  totalTripsCompleted: number;
  plateNumber: string;
  vehicle: string;
  image: string;
  registrationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

class DriverService {
  public getAllDrivers(): SWRResponse<DriverResponse[], any, any> {
    return useSWR(`/drivers`);
  }

  public getDriver(id: string): SWRResponse<DriverResponse, any, any> {
    return useSWR(`/drivers/${id}`);
  }

  public async createDriver(params: Driver) {
    const form = new FormData();

    for (let p in params) {
      // @ts-ignore
      form.append(p, params[p]);
    }

    try {
      const response = await axiosInstance.post(`${API_URL}/drivers`, params);
      return response.data;
    } catch (error) {
      console.debug(error);
      return null; // Return null or handle error as needed
    }
  }

  public async confirmRide(arg: {
    userId: string;
    driverId: string;
    isConfirmed: boolean;
    rejectionReason?: string;
  }) {
    const formData = new FormData();
    for (let keys in arg) {
      // @ts-ignore
      formData.append(keys, arg[keys]);
    }
    try {
      const response = await axiosInstance.post(
        `${API_URL}/travels/`,
        formData
      );
      console.log(response);
      return response.data();
    } catch (error) {
      console.debug("error confirmRide", error);
      return null; // Return null or handle error as needed
    }
  }
}

export const driverService = new DriverService();
