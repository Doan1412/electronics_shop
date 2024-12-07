import FilterCategory from "./FilterCategory";
import FilterBrand from "./FilterBrand";
import FilterPrice from "./FilterPrice";
import FilterShipping from "./FilterShipping";
import FilterRating from "./FilterRating";
import { IoReload } from "react-icons/io5";
import { useFilterContext } from "../contexts/FilterContext";

const FilterBar = () => {
  const { clearFilters } = useFilterContext();

  return (
    <div className="w-[90%] bg-white p-4">
      <div className="flex justify-between my-6">
        <h2 className="text-2xl font-semibold">Filters</h2>
        <button
          className="flex gap-2 text-xs text-gray-500 items-center pt-1"
          onClick={clearFilters}
        >
          <IoReload />
          <span>Clear filters</span>
        </button>
      </div>
      <hr />
      <FilterCategory />
      <FilterBrand />
      <FilterPrice />
      <FilterShipping />
      <FilterRating />
    </div>
  );
};

export default FilterBar;
