export interface FilterParams {
  category?: string;
  subcategory?: string;
  brands?: string[];
  price?: {
    min?: number;
    max?: number;
  };
  freeShipping?: boolean;
  ratings?: number;
  sortOrder?: string;
  perPage?: number;
  page?: number;
  query?: string;
};
