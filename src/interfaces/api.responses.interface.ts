export interface UsersResponse {
  success: boolean;
  data: User[];
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  last_connection: string | null;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}
