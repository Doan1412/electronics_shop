import { FilterParams } from "../types/filterParams.type";

export const buildQueryString = (filters: FilterParams = {}, page: number = 1): string => {
  const queryParams: string[] = [];

  if (filters.category) {
    if (filters.subcategory) {
      queryParams.push(`hierarchicalCategories.lvl1=${encodeURIComponent(filters.category)} > ${encodeURIComponent(filters.subcategory)}`);
    } else {
      queryParams.push(`hierarchicalCategories.lvl0=${encodeURIComponent(filters.category)}`);
    }
  }

  if (filters.brands && filters.brands.length > 0) {
    filters.brands.forEach((brand) => {
      queryParams.push(`brand=${brand}`);
    });
  }

  if (filters.price) {
    if (filters.price.min !== undefined) {
      queryParams.push(`price_gte=${filters.price.min}`);
    }
    if (filters.price.max !== undefined) {
      queryParams.push(`price_lte=${filters.price.max}`);
    }
  }

  if (filters.freeShipping !== undefined) {
    queryParams.push(`free_shipping=${filters.freeShipping}`);
  }

  if (filters.ratings !== undefined) {
    queryParams.push(`rating=${filters.ratings}`);
  }

  return queryParams.join("&");
};
