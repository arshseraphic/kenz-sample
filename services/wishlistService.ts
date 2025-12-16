import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import { TokenManager } from "@/lib/utils/tokenManager";

// --------------------
// Interfaces
// --------------------

export interface WishlistItem {
  _id: string;
  product_id: string;
  user_id: string;
  createdAt?: string;
  updatedAt?: string;
}

interface WishlistResponse {
  status: string;
  message: string;
  data: WishlistItem[];
}

interface AddWishlistResponse {
  status: string;
  message: string;
  data: WishlistItem;
}

interface RemoveWishlistResponse {
  status: string;
  message: string;
}

// --------------------
// Service Class
// --------------------

class WishlistService {
  private static instance: WishlistService;

  static getInstance(): WishlistService {
    if (!WishlistService.instance) {
      WishlistService.instance = new WishlistService();
    }
    return WishlistService.instance;
  }

  /**
   * Get all wishlist items for the logged-in user
   */
  async getWishlist(): Promise<WishlistItem[]> {
    try {
      console.log("Fetching wishlist...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        return [];
      }

      const response: AxiosResponse<WishlistResponse> = await api.get(
        "/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Wishlist response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching wishlist:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.status === 401) {
        console.log("Token invalid, clearing tokens...");
        TokenManager.clearAllTokens();
        return [];
      }

      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch wishlist. Please try again."
      );
    }
  }

  /**
   * Add product to wishlist
   */
  async addToWishlist(product_id: string): Promise<WishlistItem> {
    try {
      console.log("Adding to wishlist...", product_id);
      const token = TokenManager.getToken();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<AddWishlistResponse> = await api.post(
        "/wishlist/add",
        { product_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Add wishlist response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Error adding to wishlist:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to add to wishlist. Please try again."
      );
    }
  }

  /**
   * Remove product from wishlist
   */
  async removeFromWishlist(wishlist_id: string): Promise<boolean> {
    try {
      console.log("Removing from wishlist...");
      const token = TokenManager.getToken();

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<RemoveWishlistResponse> = await api.delete(
        "/wishlist/remove",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { wishlist_id },
        }
      );

      console.log("Remove wishlist response:", response.data);
      return true;
    } catch (error: any) {
      console.error("Error removing from wishlist:", error);
      throw new Error(
        error.response?.data?.message ||
          "Failed to remove from wishlist. Please try again."
      );
    }
  }
}

export default WishlistService.getInstance();
