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

export interface LoginResponse {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string | null;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  roles: string[];
  status: UserStatus;
  accessToken: string;
}
