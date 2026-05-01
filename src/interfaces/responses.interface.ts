export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface AuthUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string | null;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  roles: string[];
  status: UserStatus;
}

export interface LoginWebResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  sessionId: string;
}

export interface RefreshWebResponse {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpiresIn: number; // seconds
  refreshTokenExpiresIn?: number; // seconds
}
