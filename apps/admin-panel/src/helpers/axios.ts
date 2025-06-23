import { QueryClient } from "@tanstack/solid-query";
import { QUERY_KEYS } from "@utils/constants";
import axios, { type AxiosError, type AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL + "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown): Promise<never> => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.AUTH.CHECK_AUTH],
        });
        return Promise.reject(axiosError);
      }

      return Promise.reject(axiosError);
    } else {
      console.error("An unknown error occurred:", error);
      return Promise.reject(new Error("An unknown error occurred"));
    }
  },
);

// Create a QueryClient instance with default options for queries
export const queryClient = new QueryClient();

export default api;
