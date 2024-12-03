import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useFilterContext } from "../contexts/FilterContext";

const SearchBar = () => {
  const { filters, setFilters } = useFilterContext();
  const [queryParams, setQueryParams] = useState<string>("");

  useEffect(() => {
    setQueryParams(filters.query || "");
  }, [filters.query]);

  const handleSearch = () => {
    setFilters({ ...filters, query: queryParams });
  };

  const handleClear = () => {
    setQueryParams("");
    setFilters({ ...filters, query: "" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center bg-white shadow-md rounded-md pl-8 pr-4 py-2 w-1/2 mx-auto">
      <button onClick={handleSearch} className="focus:outline-none">
        <FiSearch className="text-yellow-500 w-5 h-5 mr-2" />
      </button>
      <input
        type="text"
        value={queryParams}
        onChange={(e) => setQueryParams(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Product, brand, color, ..."
        className="flex-grow outline-none text-gray-500 text-sm placeholder-gray-400 py-3"
      />
      {queryParams && (
        <button
          onClick={handleClear}
          className="focus:outline-none text-gray-500 hover:text-black"
        >
          <IoClose className="w-5 h-5 ml-2" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
