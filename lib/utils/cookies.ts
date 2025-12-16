// Cookie utilities for token management

export interface CookieOptions {
  expires?: Date;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export const COOKIE_NAMES = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

export function serializeCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): string {
  const opts = { ...DEFAULT_COOKIE_OPTIONS, ...options };

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (opts.maxAge) {
    cookie += `; Max-Age=${opts.maxAge}`;
  }

  if (opts.expires) {
    cookie += `; Expires=${opts.expires.toUTCString()}`;
  }

  if (opts.path) {
    cookie += `; Path=${opts.path}`;
  }

  if (opts.domain) {
    cookie += `; Domain=${opts.domain}`;
  }

  if (opts.secure) {
    cookie += "; Secure";
  }

  if (opts.httpOnly) {
    cookie += "; HttpOnly";
  }

  if (opts.sameSite) {
    cookie += `; SameSite=${opts.sameSite}`;
  }

  return cookie;
}

export function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name && rest.length > 0) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(rest.join("="));
    }
  });

  return cookies;
}

export function deleteCookie(
  name: string,
  options: Partial<CookieOptions> = {}
): string {
  return serializeCookie(name, "", {
    ...options,
    expires: new Date(0),
    maxAge: 0,
  });
}
