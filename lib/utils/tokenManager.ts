// Token management utilities for client-side authentication

import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

export class TokenManager {
  // Set authentication token
  static setToken(token: string, expiresInDays: number = 7): void {
    Cookies.set(TOKEN_KEY, token, {
      expires: expiresInDays,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  // Get authentication token
  static getToken(): string | null {
    return Cookies.get(TOKEN_KEY) || null;
  }

  // Remove authentication token
  static removeToken(): void {
    Cookies.remove(TOKEN_KEY, { path: "/" });
  }

  // Set refresh token
  static setRefreshToken(refreshToken: string, expiresInDays: number = 30): void {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      expires: expiresInDays,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  // Get refresh token
  static getRefreshToken(): string | null {
    return Cookies.get(REFRESH_TOKEN_KEY) || null;
  }

  // Remove refresh token
  static removeRefreshToken(): void {
    Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
  }

  // Clear all tokens
  static clearAllTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
  }

  // Check if user is authenticated (has valid token)
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}