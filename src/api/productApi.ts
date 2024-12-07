import { applyFilters } from './../utils/filters';
import { FilterParams } from "../types/filterParams.type";
import { Product } from "../types/product.type";
import { buildQueryString } from "../utils/queryUtils";
import http from "../utils/http";

export const fetchProducts = async (filters: FilterParams = {}, page: number = 1): Promise<Product[]> => {
  try {
    const queryString = buildQueryString(filters, page);
    
    const response = await http.get(`/products?${queryString}`);
    let products = applyFilters(response.data, filters);

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
