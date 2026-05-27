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

export type ServiceInPackageOrder = {
  name: string;
  quantity: number;
};

type PackageOrderPurchaseStatus =
  | "PENDING_REVIEW"
  | "ASSIGNED_APPOINTMENT"
  | "QUOTED"
  | "PAID"
  | "CANCELLED";

export interface PackageOrderQuote {
  id: string;
  name: string;
  initialPrice: number;
  finalPrice: number | null;
  range: number;
  purchaseStatus: PackageOrderPurchaseStatus;
  services: ServiceInPackageOrder[];
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string | null;
  };
  userHouse: {
    id: string;
    name: string;
    street: string;
    complementStreet: string | null;
    city: string;
    state: string;
    zipcode: string;
  };
}

export interface IndividualService {
  serviceId: string;
  initialPrice: string;
}

export interface IndividualServiceResponse {
  id: string;
  initialPrice: number;
  service: {
    name: string;
  };
}
