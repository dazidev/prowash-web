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
  roles: string[];
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
}

type ContactStatus = "ATTENDED" | "NOT_ATTENDED";

export interface Contact {
  id: string;
  name: string;
  lastname: string | null;
  email: string;
  zipcode: string | null;
  phone: string;
  status: ContactStatus;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}
