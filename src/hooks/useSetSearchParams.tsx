import { useEffect } from "react";
import { FilterParams } from "../types/filterParams.type";
import { useSearchParams } from "react-router-dom";

export const useSetSearchParams = (filterParams: FilterParams) => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newParams = new URLSearchParams();

    if (filterParams.category) {
      newParams.set("category", filterParams.category);
    }

    if (filterParams.subcategory) {
      newParams.set("subcategory", filterParams.subcategory);
    }

    if (filterParams.brands && filterParams.brands.length > 0) {
      filterParams.brands.forEach((brand) => {
        newParams.append("brands", brand);
      });
    }

    if (filterParams.price) {
      if (filterParams.price.min !== undefined) {
        newParams.set("price_min", filterParams.price.min.toString());
      }
      if (filterParams.price.max !== undefined) {
        newParams.set("price_max", filterParams.price.max.toString());
      }
    }

    if (filterParams.freeShipping !== undefined) {
      newParams.set("freeShipping", filterParams.freeShipping.toString());
    }

    if (filterParams.ratings !== undefined) {
      newParams.set("ratings", filterParams.ratings.toString());
    }

    if (filterParams.sortOrder !== undefined) {
      newParams.set("sortOrder", filterParams.sortOrder);
    }

    if (filterParams.perPage !== undefined) {
      newParams.set("perPage", filterParams.perPage.toString());
    }

    if (filterParams.page !== undefined) {
      newParams.set("page", filterParams.page.toString());
    }

    if (filterParams.query) {
      newParams.set("query", filterParams.query);
    }

    setSearchParams(newParams);
  }, [filterParams, setSearchParams]);
};
