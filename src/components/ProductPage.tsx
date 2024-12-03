import React, { useState, useEffect } from "react";
import { Product } from "../types/product.type";
import FilterBar from "./FilterBar";
import { fetchProducts } from "../api/productApi";
import { useFilterParams } from "../hooks/useFilterParams";
import { FilterParams } from "../types/filterParams.type";
import ProductItem from "./ProductItem";
import SortBar from "./SortBar";
import { FilterProvider } from "../contexts/FilterContext";
import Pagination from "./Pagination";
import Header from "../layouts/Header";
import NoResults from "./NoResults";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const filters = useFilterParams();
  const [prevFilters, setPrevFilters] = useState<FilterParams>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(prevFilters)) {
      const fetchFilteredProducts = async () => {
        const fetchedProducts = await fetchProducts(filters);
        setProducts(fetchedProducts);
      };

      fetchFilteredProducts();
      setItemsPerPage(filters.perPage || 16);
      setCurrentPage(filters.page || 1);
      setPrevFilters(filters);
    }
  }, [filters, prevFilters]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <FilterProvider>
      <Header></Header>
      <div className="flex mx-28 py-[16px]">
        <div className="w-1/4">
          <FilterBar />
        </div>

        <div className="w-3/4">
          <SortBar />
          <hr />
          {displayedProducts.length === 0 ? (
            <NoResults />
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4 my-8">
                {displayedProducts.map((product) => (
                  <ProductItem product={product} query={filters.query || ""}/>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </FilterProvider>
  );
};

export default ProductPage;
