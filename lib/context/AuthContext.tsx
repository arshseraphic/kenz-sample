"use client";

import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  AuthContextType,
  AuthState,
  User,
  SendOTPResponse,
  VerifyOTPResponse,
} from "@/lib/types/auth";
import authService from "@/services/authService";
import { TokenManager } from "@/lib/utils/tokenManager";

// Create the auth context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [authState, setAuthState]: any = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setAuthState((prev: any) => ({ ...prev, isLoading: true }));
        console.log("Initializing auth state...");

        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Auth initialization timeout")),
            5000
          )
        );

        // Check if user is authenticated by fetching current user
        const user = (await Promise.race([
          authService.getCurrentUser(),
          timeoutPromise,
        ])) as User | null;

        console.log("user", user);

        const newState = {
          user,
          isAuthenticated: !!user,
          isLoading: false,
          error: null,
        };

        console.log("Setting auth state:", newState);
        setAuthState(newState);
        console.log("Auth state initialized:", {
          user,
          isAuthenticated: !!user,
        });
      } catch (error) {
        console.error("Error initializing auth:", error);

        // Fallback: if there's a token, assume user might be authenticated
        const hasToken = !!TokenManager.getToken();
        console.log("Auth initialization failed, but token exists:", hasToken);

        setAuthState({
          user: null,
          isAuthenticated: hasToken, // Optimistic authentication if token exists
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to initialize authentication",
        });
      }
    };

    initializeAuth();
  }, []);

  // Send OTP to phone number
  const sendOTP = async (payload: {
    phoneCode: string;
    phoneNumber: string;
  }): Promise<SendOTPResponse> => {
    try {
      setAuthState((prev: any) => ({ ...prev, error: null }));
      const response: any = await authService.sendOTP({
        phoneCode: payload.phoneCode,
        phoneNumber: payload.phoneNumber,
      });
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send OTP";
      setAuthState((prev: any) => ({ ...prev, error: errorMessage }));
      throw error;
    }
  };

  // Verify OTP and authenticate user
  const verifyOTP = async (
    phoneNumber: string,
    otp: string,
    phoneCode: string
  ): Promise<VerifyOTPResponse> => {
    try {
      setAuthState((prev: any) => ({ ...prev, error: null, isLoading: true }));

      const response: any = await authService.verifyOTP({
        phoneNumber,
        otp,
        phoneCode,
      });

      if (response.status === "success") {
        console.log("OTP verified successfully!");

        // Set the auth state
        setAuthState({
          user: response.data || null,
          isAuthenticated: !!response.data,
          isLoading: false,
          error: null,
        });

        const token = response.data?.tokens.accessToken;
        const refreshToken = response.data?.tokens.refreshToken;

        if (token) {
          TokenManager.setToken(token);
        }

        if (refreshToken) {
          TokenManager.setRefreshToken(refreshToken);
        }

        // // Force a refresh of the current user to ensure consistency
        // setTimeout(async () => {
        //   try {
        //     const refreshedUser = await authService.getCurrentUser();
        //     console.log(
        //       "Refreshed user after OTP verification:",
        //       refreshedUser
        //     );
        //     if (refreshedUser) {
        //       setAuthState((prev: any) => ({
        //         ...prev,
        //         user: refreshedUser,
        //         isAuthenticated: true,
        //       }));
        //     }
        //   } catch (refreshError) {
        //     console.error(
        //       "Error refreshing user after OTP verification:",
        //       refreshError
        //     );
        //   }
        // }, 100);
      } else {
        setAuthState((prev: any) => ({
          ...prev,
          isLoading: false,
          error: response.message || "OTP verification failed",
        }));
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to verify OTP";
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  };

  // Logout user
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with logout even if API call fails
    } finally {
      // Clear tokens and state
      TokenManager.clearAllTokens();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      router.push("/");
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    try {
      setAuthState((prev: any) => ({ ...prev, isLoading: true }));
      console.log("Refreshing user data...");
      const user = await authService.getCurrentUser();

      const newState = {
        ...authState,
        user,
        isAuthenticated: !!user,
        isLoading: false,
        error: null,
      };

      console.log("Setting refreshed auth state:", newState);
      setAuthState(newState);
      console.log("User data refreshed:", { user, isAuthenticated: !!user });
    } catch (error) {
      console.error("Error refreshing user:", error);
      setAuthState((prev: any) => ({
        ...prev,
        isLoading: false,
        error: "Failed to refresh user data",
      }));
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    sendOTP,
    verifyOTP: (phone, otp, phoneCode) => verifyOTP(phone, otp, phoneCode),
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;
