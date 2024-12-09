import useSWR from "swr";
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
class DriverService {
  public getAllDrivers() {
    return useSWR(`${API_URL}/drivers`, {});
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
}
