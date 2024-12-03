import React, { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterContext";

const SortBar = () => {
  const { filters, setFilters } = useFilterContext();
  const [sortOption, setSortOption] = useState("featured");
  const [hitsPerPage, setHitsPerPage] = useState(16);

  const sortOptions = [
    { value: "featured", label: "Sort by featured" },
    { value: "price_asc", label: "Price ascending" },
    { value: "price_desc", label: "Price descending" }
  ];

  const hitsOptions = [16, 32, 64];

  useEffect(() => {
    if (filters.sortOrder) {
      setSortOption(filters.sortOrder);
    }

    if (filters.perPage) {
      setHitsPerPage(filters.perPage);
    }
  }, [filters]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
  
    if (newSortOption !== "featured") {
      const { page, ...restFilters } = filters;
      setFilters({ ...restFilters, sortOrder: newSortOption });
    } else {
      const { sortOrder, page, ...restFilters } = filters;
      setFilters(restFilters);
    }
  };
  
  const handleHitsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHitsPerPage = Number(e.target.value);
    setHitsPerPage(newHitsPerPage);
  
    if (newHitsPerPage !== 16) {
      const { page, ...restFilters } = filters;
      setFilters({ ...restFilters, perPage: newHitsPerPage });
    } else {
      const { perPage, page, ...restFilters } = filters;
      setFilters(restFilters);
    }
  };  

  return (
    <div className="flex gap-3 justify-end items-center mt-11 mb-5 text-[12px] text-gray-700">
      <div className="relative">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="rounded px-3 py-2"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <select
          value={hitsPerPage}
          onChange={handleHitsPerPageChange}
          className="rounded px-3 py-2"
        >
          {hitsOptions.map((option) => (
            <option key={option} value={option}>
              {option} hits per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortBar;
