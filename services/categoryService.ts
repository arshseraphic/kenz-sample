import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import { TokenManager } from "@/lib/utils/tokenManager";

interface Category {
  _id: string;
  parent_id?: string | null;
  name: string;
  description?: string;
  slug: string;
  image?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  children?: Category[];
  ancestors?: Category[];
}

interface CategoryResponse {
  status: string;
  message: string;
  data: any; // Can be a single Category, Category[], or other data depending on the endpoint
}

interface CreateCategoryRequest {
  parent_id?: string;
  name: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  image?: File;
  subcategories?: Array<{
    name: string;
    description?: string;
    is_active?: boolean;
    sort_order?: number;
  }>;
}

interface UpdateCategoryRequest {
  parent_id?: string;
  name?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  image?: File; // For file uploads
}

interface Product {
  _id: string;
  category_id: string;
  name: string;
  is_active: boolean;

  prices?: Record<
    string,
    {
      amount: number;
      currency_code: string;
    }
  >;
  // Add other product fields as needed
}

class CategoryService {
  private static instance: CategoryService;

  static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  // Get all categories with optional hierarchy or parentId
  async getAllCategories(
    includeHierarchy: boolean = true,
    parentId?: string
  ): Promise<Category[]> {
    try {
      console.log("Fetching categories...");
      const token = TokenManager.getToken();

      const params: { includeHierarchy?: string; parentId?: string } = {};
      if (includeHierarchy) {
        params.includeHierarchy = "true";
      } else {
        params.includeHierarchy = "false";
      }
      if (parentId) params.parentId = parentId;

      const response: AxiosResponse<CategoryResponse> = await api.get(
        "/categories",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params,
        }
      );

      console.log("Categories response:", response.data);
      return response.data.data as Category[];
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        return [];
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch categories."
      );
    }
  }

  // Get categories with hierarchy and products
  async getCategoryHierarchyWithProducts(): Promise<Category[]> {
    try {
      console.log("Fetching category hierarchy with products...");
      const token = TokenManager.getToken();

      const response: AxiosResponse<CategoryResponse> = await api.get(
        "/categories/hierarchy-with-products",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log("Category hierarchy response:", response.data);
      return response.data.data as Category[];
    } catch (error: any) {
      console.error("Error fetching category hierarchy:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        return [];
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch category hierarchy with products."
      );
    }
  }

  // Get root categories
  async getRootCategories(): Promise<Category[]> {
    try {
      console.log("Fetching root categories...");
      const token = TokenManager.getToken();

      const response: AxiosResponse<CategoryResponse> = await api.get(
        "/categories/root",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log("Root categories response:", response.data);
      return response.data.data as Category[];
    } catch (error: any) {
      console.error("Error fetching root categories:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        return [];
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch root categories."
      );
    }
  }

  // Get category by ID with optional children and ancestors
  async getCategoryById(
    id: string,
    includeChildren: boolean = false,
    includeAncestors: boolean = false
  ): Promise<Category> {
    try {
      console.log(`Fetching category by ID: ${id}`);
      const token = TokenManager.getToken();

      const params: { includeChildren?: string; includeAncestors?: string } =
        {};
      if (includeChildren) params.includeChildren = "true";
      if (includeAncestors) params.includeAncestors = "true";

      const response: AxiosResponse<CategoryResponse> = await api.get(
        `/categories/${id}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params,
        }
      );

      console.log("Category response:", response.data);
      return response.data.data as Category;
    } catch (error: any) {
      console.error("Error fetching category by ID:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch category."
      );
    }
  }

  // Get category by slug
  async getCategoryBySlug(
    slug: string,
    includeChildren: boolean = false
  ): Promise<Category> {
    try {
      console.log(`Fetching category by slug: ${slug}`);
      const token = TokenManager.getToken();

      const params: { includeChildren?: string } = {};
      if (includeChildren) params.includeChildren = "true";

      const response: AxiosResponse<CategoryResponse> = await api.get(
        `/categories/slug/${slug}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params,
        }
      );

      console.log("Category by slug response:", response.data);
      return response.data.data as Category;
    } catch (error: any) {
      console.error("Error fetching category by slug:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch category by slug."
      );
    }
  }

  // Get products in a category
  async getCategoryProducts(
    id: string,
    includeDescendants: boolean = false
  ): Promise<Product[]> {
    try {
      console.log(`Fetching products for category ID: ${id}`);
      const token = TokenManager.getToken();

      const params: { includeDescendants?: string } = {};
      if (includeDescendants) params.includeDescendants = "true";

      const response: AxiosResponse<CategoryResponse> = await api.get(
        `/categories/${id}/products`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          params,
        }
      );

      console.log("Category products response:", response.data);
      return response.data.data as Product[];
    } catch (error: any) {
      console.error("Error fetching category products:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch category products."
      );
    }
  }

  // Get category ancestors
  async getCategoryAncestors(id: string): Promise<Category[]> {
    try {
      console.log(`Fetching ancestors for category ID: ${id}`);
      const token = TokenManager.getToken();

      const response: AxiosResponse<CategoryResponse> = await api.get(
        `/categories/${id}/ancestors`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log("Category ancestors response:", response.data);
      return response.data.data as Category[];
    } catch (error: any) {
      console.error("Error fetching category ancestors:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch category ancestors."
      );
    }
  }

  // Get category descendants
  async getCategoryDescendants(id: string): Promise<Category[]> {
    try {
      console.log(`Fetching descendants for category ID: ${id}`);
      const token = TokenManager.getToken();

      const response: AxiosResponse<CategoryResponse> = await api.get(
        `/categories/${id}/descendants`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      console.log("Category descendants response:", response.data);
      return response.data.data as Category[];
    } catch (error: any) {
      console.error("Error fetching category descendants:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch category descendants."
      );
    }
  }

  // Create a new category
  async createCategory(request: FormData): Promise<Category> {
    try {
      console.log("Creating new category...", request);

      const token = TokenManager.getToken();
      if (!token) throw new Error("No authentication token found");

      const response: AxiosResponse<CategoryResponse> = await api.post(
        "/categories",
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Category create response:", response.data);
      return response.data.data as Category;
    } catch (error: any) {
      console.error("Error creating category:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.status === 401) {
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }

      throw new Error(
        error.response?.data?.message || "Failed to create category."
      );
    }
  }

  // Update a category
  async updateCategory(_id: string, request: any): Promise<Category> {
    try {
      console.log(`Updating category ID: ${_id}`);
      const token = TokenManager.getToken();

      for (const [key, value] of request.entries()) {
        console.log(`${key}:`, value);
      }

      if (!token) throw new Error("No authentication token found");

      let formData: FormData;

      // If already a FormData (from the form), use it directly
      if (request instanceof FormData) {
        formData = request;
      } else {
        // Else, convert plain object to FormData
        formData = new FormData();
        if (request.parent_id !== undefined)
          formData.append("parent_id", request.parent_id || "");
        if (request.name) formData.append("name", request.name);
        if (request.description)
          formData.append("description", request.description);
        if (request.is_active !== undefined)
          formData.append("is_active", String(request.is_active));
        if (request.sort_order !== undefined)
          formData.append("sort_order", String(request.sort_order));
        if (request.image) formData.append("image", request.image);

        if (request.subcategories && request.subcategories.length > 0) {
          formData.append(
            "subcategories",
            JSON.stringify(request.subcategories)
          );
        }
      }

      const response: AxiosResponse<CategoryResponse> = await api.put(
        `/categories/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Category update response:", response.data);
      return response.data.data as Category;
    } catch (error: any) {
      console.error("Error updating category:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.status === 401) {
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }

      throw new Error(
        error.response?.data?.message || "Failed to update category."
      );
    }
  }

  // Delete a category
  async deleteCategory(id: string, force: boolean = false): Promise<void> {
    try {
      console.log(`Deleting category ID: ${id}`);
      const token = TokenManager.getToken();

      if (!token) {
        console.warn("No token found in cookies");
        throw new Error("No authentication token found");
      }

      const response: AxiosResponse<CategoryResponse> = await api.delete(
        `/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { force: force ? "true" : "false" },
        }
      );

      console.log("Category delete response:", response.data);
    } catch (error: any) {
      console.error("Error deleting category:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        console.log("Token is invalid, clearing tokens");
        TokenManager.clearAllTokens();
        throw new Error("Authentication token is invalid");
      }
      throw new Error(
        error.response?.data?.message || "Failed to delete category."
      );
    }
  }
}

export default CategoryService.getInstance();
