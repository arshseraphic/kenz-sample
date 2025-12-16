// Authentication service for backend API calls

import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import {
  SendOTPRequest,
  SendOTPResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
  User,
} from "@/lib/types/auth";
import { TokenManager } from "@/lib/utils/tokenManager";

class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Send OTP to phone number
  async sendOTP(request: SendOTPRequest): Promise<SendOTPResponse> {
    try {
      const response: AxiosResponse<SendOTPResponse> = await api.post(
        "/auth/send-otp",
        request
      );
      console.log("OTP sent successfully checking:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      throw new Error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  }

  // Verify OTP and get auth token
  async verifyOTP(request: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    try {
      const response: AxiosResponse<VerifyOTPResponse> = await api.post(
        "/auth/verify-otp",
        request
      );
      console.log("OTP verification response:", response);
      console.log("Response headers:", response.headers);
      return response.data;
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to verify OTP. Please try again."
      );
    }
  }

  // Get current user profile
  async getCurrentUser(): Promise<User | null> {
    try {
      console.log("Fetching current user...");
      const token = TokenManager.getToken();

      console.log("fetched token-- ", token);

      if (!token) {
        console.warn("No token found in cookies");
        return null;
      }

      const response: any = await api.get(
        "/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Current user response:", response.data);
      console.log("Response status:", response.status);

      // Handle different response structures
      let user = null;
      if (response.data.user) {
        user = response.data.user;
      } else if (response.data.data) {
        user = response.data.data;
      } else if (response.data.id) {
        user = response.data;
      }

      console.log("Extracted user:", user);
      return user;
    } catch (error: any) {
      console.error("Error fetching current user:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        // Clear invalid token
        TokenManager.clearAllTokens();
        return null; // Not authenticated
      }
      return null;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error: any) {
      console.error("Error during logout:", error);
      throw new Error(
        error.response?.data?.message || "Failed to logout. Please try again."
      );
    }
  }

  // Refresh auth token
  async refreshToken(): Promise<{ token: string } | null> {
    try {
      const response: AxiosResponse<{ token: string }> = await api.post(
        "/auth/refresh"
      );
      return response.data;
    } catch (error: any) {
      console.error("Error refreshing token:", error);
      return null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }

  // Simple token validation without API call
  hasValidToken(): boolean {
    const token = TokenManager.getToken();
    return !!token && token.trim() !== "";
  }
}

export default AuthService.getInstance();
