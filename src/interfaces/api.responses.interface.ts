const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT;

export const API =
  ENV === "production" ? process.env.NEXT_PUBLIC_API : "http://localhost:3000";

export interface UsersResponse {
  success: boolean;
  data: User[];
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  roles: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}
