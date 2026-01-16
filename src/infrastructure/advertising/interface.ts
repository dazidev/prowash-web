export interface AdvertisingForm {
  type: string;
  order: number;
  text?: string;
  image1?: File; //* no pueden ser nulos porque lo mínimo son dos imagenes para carrusel
  image2?: File;
  image3?: File | null;
  image4?: File | null;
  image5?: File | null;
  video?: string;
}
