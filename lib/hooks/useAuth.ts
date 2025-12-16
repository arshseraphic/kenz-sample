// Custom hook for authentication state and actions

import { useAuth } from "@/lib/context/AuthContext";

// Re-export the useAuth hook for convenience
export { useAuth } from "@/lib/context/AuthContext";

// Additional auth-related hooks can be added here

export const useAuthActions = () => {
  const { sendOTP, verifyOTP, logout, refreshUser } = useAuth();

  return {
    sendOTP,
    verifyOTP,
    logout,
    refreshUser,
  };
};

export const useAuthState = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
};

// Hook to check if user has specific permissions (extensible for future use)
export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!isAuthenticated || !user) return false;

    // Add your permission logic here
    // For now, authenticated users have all permissions
    return true;
  };

  const canAccessRoute = (route: string): boolean => {
    const protectedRoutes = [
      "/profile",
      "/order-details",
      "/shopping-bag",
      "/address",
    ];

    if (
      !protectedRoutes.some((protectedRoute) =>
        route.startsWith(protectedRoute)
      )
    ) {
      return true; // Public route
    }

    return isAuthenticated;
  };

  return {
    hasPermission,
    canAccessRoute,
  };
};
