

export const HOSTNAME = 'http://localhost:3000'


export type AdTypes = 'TEXT' | 'IMAGE' | 'IMAGE_CAROUSEL' | 'VIDEO';

export interface AdItem {
  id: string;                 // UUID
  type: AdTypes;
  order: number;
  text: string | null;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  image5: string | null;
  video: string | null;
  createdAt: string;          // ISO 8601
  updatedAt: string;          // ISO 8601
}

export interface UploadUrl {
  uploadUrl: string,
  key: string
}

export interface Error {
  code: string,
  message: string
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: Error
}

export interface ApiBooleanResponse {
  success: boolean
}

export type AdResponse = ApiResponse<AdItem>
export type UrlUpImageResponse = ApiResponse<UploadUrl>