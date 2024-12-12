// import useSWR, { SWRConfiguration } from "swr";
// import axios from "axios";
// import { authService } from "@/services/auth-service";

// const API_URL = "https://your-api-url.com/api";

// const fetcher = async (url: string) => {
//   const tokens = await authService.getTokens();
//   if (!tokens) throw new Error("No access token available");

//   try {
//     const response = await axios.get(url, {
//       headers: { Authorization: `Bearer ${tokens.accessToken}` },
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response?.status === 401) {
//       // Token has expired, try to refresh
//       const newTokens = await authService.refreshTokens();
//       const retryResponse = await axios.get(url, {
//         headers: { Authorization: `Bearer ${newTokens.accessToken}` },
//       });
//       return retryResponse.data;
//     }
//     throw error;
//   }
// };

// export function useAuthenticatedSWR<Data = any, Error = any>(
//   key: string,
//   config?: SWRConfiguration<Data, Error>
// ) {
//   return useSWR<Data, Error>(`${API_URL}${key}`, fetcher, config);
// }

export function useSomething() {
  console.log("something");
}
