import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import { TokenManager } from "@/lib/utils/tokenManager";

interface Product {
  _id: string;
  category_id: string;
  sku: string;
  name: string;
  title?: string;
  description?: string;
  price_inr: number;
  price_usd: number;
  compare_price?: number;
  images?: string[];
  attributes?: Record<string, any>;
  new_arrivals?: boolean;
  best_sellers?: boolean;
  weight?: number;
  tags?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  prices?: Record<
    string,
    {
      amount: number;
      currency_code: string;
    }
  >;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  available_stock?: number;
}

interface ProductResponse {
  status: string;
  message: string;
  data: any; // Can be Product, Product[], or stock info depending on the endpoint
}

interface CreateProductRequest {
  category_id: string;
  sku: string;
  name: string;
  title?: string;
  description?: string;
  price_inr: number;
  price_usd: number;
  compare_price?: number;
  quantity?: number;
  images?: string[];
  attributes?: Record<string, any>;
  new_arrivals?: boolean;
  best_sellers?: boolean;
  weight?: number;
  tags?: string[];
  is_active?: boolean;
}

interface UpdateProductRequest {
  category_id?: string;
  sku?: string;
  name?: string;
  title?: string;
  description?: string;
  price_inr?: number;
  price_usd?: number;
  compare_price?: number;
  images?: string[];
  attributes?: Record<string, any>;
  new_arrivals?: boolean;
  best_sellers?: boolean;
  weight?: number;
  tags?: string[];
  is_active?: boolean;
}

class ProductService {
  private static instance: ProductService;

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  // Get all products with filtering and pagination
  async getAllProducts(params: {
    category_id?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
    tags?: string;
    is_active?: boolean;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    page?: number;
    limit?: number;
    include_stock?: boolean;
    best_sellers?: boolean;
    new_arrivals?: boolean;
    country?: string;
  }): Promise<any> {
    try {
      console.log("Fetching all products...");
      const token = TokenManager.getToken();

      const queryParams: any = {
        category_id: params.category_id,
        search: params.search,
        min_price: params.min_price,
        max_price: params.max_price,
        tags: params.tags,
        is_active:
          params.is_active !== undefined ? String(params.is_active) : "true",
        sort_by: params.sort_by || "name",
        sort_order: params.sort_order || "asc",
        page: params.page || 1,
        limit: params.limit || 10,
        include_stock: params.include_stock ? "true" : "false",
        best_sellers: params.best_sellers,
        new_arrivals: params.new_arrivals,
        country: params.country,
      };

      const response: AxiosResponse<ProductResponse> = await api.get(
        "/products",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params: queryParams,
        }
      );

      console.log("Products response:", response.data);
      return {
        results: response.data.data,
      };
    } catch (error: any) {
      console.error("Error fetching products:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch products."
      );
    }
  }

  // Get product by ID
  async getProductById(
    id: string,
    include_stock: boolean = false,
    country?: string
  ): Promise<Product> {
    try {
      console.log(`Fetching product by ID: ${id}`);
      const token = TokenManager.getToken();

      const response: AxiosResponse<ProductResponse> = await api.get(
        `/products/${id}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params: {
            include_stock: include_stock ? "true" : "false",
            country: country,
          },
        }
      );

      console.log("Product response:", response.data);
      return response.data.data as Product;
    } catch (error: any) {
      console.error("Error fetching product by ID:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch product."
      );
    }
  }

  // Get products by category
  async getProductsByCategory(
    categoryId: string,
    include_subcategories: boolean = false,
    include_stock: boolean = false,
    page: number = 1,
    limit: number = 10,
    country?: string
  ): Promise<any> {
    try {
      console.log(`Fetching products for category ID: ${categoryId}`);
      const token = TokenManager.getToken();

      const response: AxiosResponse<ProductResponse> = await api.get(
        `/products/category/${categoryId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params: {
            include_subcategories: include_subcategories ? "true" : "false",
            include_stock: include_stock ? "true" : "false",
            page,
            limit,
            country: country,
          },
        }
      );

      console.log("Products by category response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching products by category:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch products by category."
      );
    }
  }

  // Create a new product
  async createProduct(request: CreateProductRequest): Promise<Product> {
    try {
      console.log("Creating new product...");
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<ProductResponse> = await api.post(
        "/products",
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Product create response:", response.data);
      return response.data.data as Product;
    } catch (error: any) {
      console.error("Error creating product:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to create product."
      );
    }
  }

  // Update a product
  async updateProduct(
    id: string,
    request: UpdateProductRequest
  ): Promise<Product> {
    try {
      console.log(`Updating product ID: ${id}`);
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<ProductResponse> = await api.put(
        `/products/${id}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Product update response:", response.data);
      return response.data.data as Product;
    } catch (error: any) {
      console.error("Error updating product:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update product."
      );
    }
  }

  // Delete a product
  async deleteProduct(id: string): Promise<void> {
    try {
      console.log(`Deleting product ID: ${id}`);
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<ProductResponse> = await api.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Product delete response:", response.data);
    } catch (error: any) {
      console.error("Error deleting product:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete product."
      );
    }
  }
}

export type { Product };

export default ProductService.getInstance();
