// Authentication related TypeScript interfaces and types

export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SendOTPRequest {
  phoneCode: string;
  phoneNumber: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  sessionId?: string;
}

export interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
  phoneCode: string;
  sessionId?: string;
}

export interface VerifyOTPResponse {
  status: string;
  message: string;
  data?: User & {
    tokens: {
      accessToken: string;
      refreshToken?: string;
    };
  };
}

export interface AuthContextType extends AuthState {
  sendOTP: (payload: {
    phoneCode: string;
    phoneNumber: string;
  }) => Promise<SendOTPResponse>;
  verifyOTP: (
    phone: string,
    otp: string,
    phoneCode: string
  ) => Promise<VerifyOTPResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface AuthModalStep {
  PHONE: "phone";
  OTP: "otp";
}

export const AUTH_STEPS: AuthModalStep = {
  PHONE: "phone",
  OTP: "otp",
} as const;

export type AuthStep = (typeof AUTH_STEPS)[keyof typeof AUTH_STEPS];
