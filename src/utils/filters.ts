import { FilterParams } from "../types/filterParams.type";
import { Product } from "../types/product.type";

export const applyFilters = (products: Product[], filters: FilterParams): Product[] => {
  const filteredProducts = products.filter((product: Product) => {
    const matchesSubcategory = !filters.subcategory ||
      product.hierarchicalCategories?.lvl1 === `${filters.category} > ${filters.subcategory}`;
    
    const matchesBrand = !filters.brands || filters.brands.length === 0 || (product.brand && filters.brands.includes(product.brand));

    const matchesQuery =
      !filters.query ||
      (product.name && product.name.toLowerCase().includes(filters.query.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(filters.query.toLowerCase()));

    return matchesSubcategory && matchesBrand && matchesQuery;
  });

  if (filters.sortOrder) {
    switch (filters.sortOrder) {
      case "price_asc":
        return filteredProducts.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "price_desc":
        return filteredProducts.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "featured":
        return filteredProducts;
      default:
        return filteredProducts;
    }
  }

  return filteredProducts;
};
