// Axios instance configuration for API calls

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { parseCookies, COOKIE_NAMES } from "./utils/cookies";

// Create base axios instance
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Important for cookies
  });

  // Request interceptor - Removed client-side token handling for httpOnly cookies
  instance.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
      // With httpOnly cookies, we don't need to manually add the Authorization header
      // The browser will automatically include cookies with requests when withCredentials is true
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response) => {
      // Check if there are any set-cookie headers
      const setCookieHeader =
        response.headers["set-cookie"] || response.headers["Set-Cookie"];
      if (setCookieHeader) {
        console.log("Set-Cookie header found:", setCookieHeader);
      }
      return response;
    },
    (error: AxiosError) => {
      // Handle 401 errors (unauthorized)
      if (error.response?.status === 401) {
        // Token expired or invalid - let the auth service handle this
        console.log("401 Unauthorized - token may be invalid");
        // Don't redirect here, let the auth context handle it
      }

      // Handle network errors
      if (!error.response) {
        console.error("Network error:", error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create and export the axios instance
const api = createAxiosInstance();

export default api;

// Export types for use in services
export type { AxiosResponse, AxiosError } from "axios";
