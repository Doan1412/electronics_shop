import React, { useState, useEffect } from "react";
import { useFilterContext } from "../contexts/FilterContext";
import { useSetSearchParams } from "../hooks/useSetSearchParams";

const FilterShipping = () => {
  const { filters, setFilters } = useFilterContext();
  const [isShipping, setIsShipping] = useState(false);
  useSetSearchParams(filters);

  useEffect(() => {
    if (filters.freeShipping === true) {
      setIsShipping(true);
    } else if (filters.freeShipping === false) {
      setIsShipping(false);
    }
  }, [filters]);

  const handleShippingChange = (checked: boolean) => {
    setIsShipping(checked);

    setFilters((prevParams) => {
      const newParams = { ...prevParams };
      delete newParams.page;
      if (checked) {
        newParams.freeShipping = true;
      } else {
        delete newParams.freeShipping;
      }

      return newParams;
    });
  };

  return (
    <div>
      <hr />
      <div className="my-8">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          Free Shipping
        </h3>
        <div className="mt-4 flex items-center gap-1">
          <span className="text-sm">Display only items with free shipping</span>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isShipping ? 'text-yellow-500' : 'text-gray-500'} ml-2`}>
              {isShipping ? 'Yes' : 'No'}
            </span>
            <label
              htmlFor="shipping-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="shipping-toggle"
                checked={isShipping}
                onChange={(e) => handleShippingChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-gray-200 rounded-full peer-checked:bg-yellow-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white after:absolute after:top-[0px] after:left-[0px] after:bg-white after:shadow-lg after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-focus:ring-yellow-300"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterShipping;
