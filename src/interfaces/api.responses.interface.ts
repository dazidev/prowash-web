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

export type PackageOrderPurchaseStatus =
  | "PENDING_REVIEW"
  | "ASSIGNED_APPOINTMENT"
  | "APPOINTMENT_RESCHEDULE_REQUESTED"
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
  appointmentAt: string | null;
  appointmentTimeZone: string | null;
  appointmentAcceptedAt: string | null;
  appointmentVersion: number;
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

export type PackageOrderStatusUpdated = Pick<
  PackageOrderQuote,
  "id" | "purchaseStatus" | "updatedAt"
>;

export interface AssignUserQuoteAppointmentPayload {
  appointmentAt: string;
  expectedAppointmentVersion: number;
}

export interface SetUserQuoteFinalPricePayload {
  finalPrice: number;
  expectedAppointmentVersion: number;
  expectedFinalPrice: number | null;
}

export type PackageOrderAppointmentUpdated = Pick<
  PackageOrderQuote,
  | "id"
  | "purchaseStatus"
  | "appointmentAt"
  | "appointmentTimeZone"
  | "appointmentAcceptedAt"
  | "appointmentVersion"
  | "updatedAt"
>;

export type PackageOrderFinalPriceUpdated = PackageOrderAppointmentUpdated &
  Pick<PackageOrderQuote, "initialPrice" | "finalPrice">;

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

export interface PublicPackageService {
  id: string;
  serviceId: string;
  name: string;
  amount: number;
}

export interface PublicPackagePrice {
  id: string;
  price: number;
  name: string;
  unit: string;
}

export interface PublicPackage {
  id: string;
  name: string;
  services: PublicPackageService[];
  prices: PublicPackagePrice[];
}

export type WebQuoteRequestStatus = "PENDING_REVIEW" | "ATTENDED" | "CANCELLED";

export interface CreateWebQuotePayload {
  name: string;
  lastname?: string;
  email: string;
  phone: string;
  zipcode?: string;
  comments: string;
  packageId: string;
  packagePriceId: string;
}

export interface WebQuoteCreated {
  id: string;
  status: WebQuoteRequestStatus;
  createdAt: string;
}

export interface WebQuoteService {
  serviceId: string;
  name: string;
  amount: number;
}

export interface WebQuoteRequest {
  id: string;

  name: string;
  lastname: string | null;
  email: string;
  phone: string;
  zipcode: string | null;
  comments: string;

  packageId: string;
  packagePriceId: string;
  packageName: string;
  initialPrice: number;
  rangeName: string;
  rangeUnit: string;
  services: WebQuoteService[];

  status: WebQuoteRequestStatus;
  createdAt: string;
  updatedAt: string;
}
