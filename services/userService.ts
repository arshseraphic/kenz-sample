import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import { TokenManager } from "@/lib/utils/tokenManager";

interface UserProfile {
  id: string;
  name: string;
  gender: string;
  email: string;
  dateOfBirth: string | null;
  phone: string;
  phoneCode: string;
  countryCode: string;
}

interface ProfileResponse {
  status: string;
  message: string;
  data: UserProfile;
}

interface EditProfileRequest {
  name: string;
  gender: string;
  email: string;
  dateOfBirth: string;
}

interface EmailExistRequest {
  email: string;
}

class UserService {
  private static instance: UserService;

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // Get user profile
  async getProfile(): Promise<UserProfile | null> {
    try {
      console.log("Fetching user profile...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        return null;
      }

      const response: AxiosResponse<ProfileResponse> = await api.get(
        "/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile response:", response);
      console.log("Response status:", response.status);

      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        return null;
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch profile. Please try again."
      );
    }
  }
  async checkEmailAvailability(request: EmailExistRequest): Promise<any> {
    try {
      console.log("Fetching user profile...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        return null;
      }

      const response: AxiosResponse<ProfileResponse> = await api.post(
        "/profile/check-email-exists",
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile response:", response);
      console.log("Response status:", response.status);

      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        return null;
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch profile. Please try again."
      );
    }
  }

  // Update user profile
  async updateProfile(request: EditProfileRequest): Promise<UserProfile> {
    try {
      console.log("Updating user profile...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<ProfileResponse> = await api.put(
        "/profile/edit-profile",
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile update response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Error updating profile:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  }
}

export default UserService.getInstance();
