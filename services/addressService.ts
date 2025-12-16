import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import { TokenManager } from "@/lib/utils/tokenManager";

interface Address {
  id: string;
  full_name: string;
  house_no: string;
  street_area: string;
  state_province_region: string;
  city_town: string;
  country: string;
  pincode_zipcode: string;
  landmark?: string;
  address_type?: string;
  is_default: boolean;
  user: string;
  created_at: string;
  updated_at: string;
}

interface AddressResponse {
  status: string;
  message: string;
  data: Address;
}

interface AddressesResponse {
  status: string;
  message: string;
  data: Address[];
}

interface AddAddressRequest {
  full_name: string;
  house_no: string;
  street_area: string;
  state_province_region: string;
  city_town: string;
  country: string;
  pincode_zipcode: string;
  address_type?: string;
}

interface UpdateAddressRequest {
  full_name: string;
  house_no: string;
  street_area: string;
  state_province_region: string;
  city_town: string;
  country: string;
  pincode_zipcode: string;
  address_type?: string;
}

class AddressService {
  private static instance: AddressService;

  static getInstance(): AddressService {
    if (!AddressService.instance) {
      AddressService.instance = new AddressService();
    }
    return AddressService.instance;
  }

  // Add new address
  async addAddress(request: AddAddressRequest): Promise<Address> {
    try {
      console.log("Adding new address...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<AddressResponse> = await api.post(
        "/address",
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Address add response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Error adding address:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to add address. Please try again."
      );
    }
  }

  // Get all addresses
  async getAddresses(): Promise<Address[]> {
    try {
      console.log("Fetching user addresses...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        return [];
      }

      const response: AxiosResponse<AddressesResponse> = await api.get(
        "/address",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Addresses response:", response);
      console.log("Response status:", response.status);

      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching addresses:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        return [];
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch addresses. Please try again."
      );
    }
  }

  // get address by id
  async getAddressesByid(addressId: string): Promise<Address> {
    try {
      console.log("Fetching user address by id...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<AddressResponse> = await api.get(
        `/address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Address response:", response);
      console.log("Response status:", response.status);

      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching address:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch address. Please try again."
      );
    }
  }

  // Update address
  async updateAddress(
    addressId: string,
    request: UpdateAddressRequest
  ): Promise<Address> {
    try {
      console.log("Updating address...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<AddressResponse> = await api.put(
        `/address/${addressId}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Address update response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Error updating address:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to update address. Please try again."
      );
    }
  }

  // Delete address
  async deleteAddress(addressId: string): Promise<void> {
    try {
      console.log("Deleting address...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      await api.delete(`/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Address deleted successfully");
    } catch (error: any) {
      console.error("Error deleting address:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to delete address. Please try again."
      );
    }
  }

  // Set default address
  async setDefaultAddress(addressId: string): Promise<Address> {
    try {
      console.log("Setting default address...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<AddressResponse> = await api.patch(
        `/address/${addressId}/default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      console.error("Error setting default address:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to set default address. Please try again."
      );
    }
  }
}

export default AddressService.getInstance();