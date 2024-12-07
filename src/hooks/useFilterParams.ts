import { useSearchParams } from "react-router-dom";
import { FilterParams } from "../types/filterParams.type";

export const useFilterParams = (): FilterParams => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || undefined;
  const subcategory = searchParams.get("subcategory") || undefined;
  const brands = searchParams.getAll("brands") || [];
  const priceMin = searchParams.has("price_min") ? parseFloat(searchParams.get("price_min")!) : undefined;
  const priceMax = searchParams.has("price_max") ? parseFloat(searchParams.get("price_max")!) : undefined;
  const freeShipping = searchParams.get("freeShipping") === "true";
  const ratings = searchParams.has("ratings") ? parseInt(searchParams.get("ratings")!) : undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;
  const perPage = searchParams.has("perPage") ? parseInt(searchParams.get("perPage")!) : undefined;
  const page = searchParams.has("page") ? parseInt(searchParams.get("page")!) : undefined;
  const query = searchParams.get("query") || undefined;

  const filters: FilterParams = {
    category,
    subcategory,
    brands: brands.length > 0 ? brands : undefined,
    price: (priceMin || priceMax) ? { min: priceMin, max: priceMax } : undefined,
    freeShipping: freeShipping || undefined,
    ratings: ratings || undefined,
    sortOrder,
    perPage,
    page,
    query
  };

  return filters;
};
