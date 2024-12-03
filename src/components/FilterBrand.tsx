import React, { useState, useEffect } from "react";
import { fetchBrands } from "../api/brandApi";
import { Brand } from "../types/brand.type";
import { FiSearch } from "react-icons/fi";
import { useSetSearchParams } from "../hooks/useSetSearchParams";
import { FilterParams } from "../types/filterParams.type";
import { useFilterContext } from "../contexts/FilterContext";

const FilterBrand = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const { filters, setFilters } = useFilterContext();
  useSetSearchParams(filters);

  useEffect(() => {
    const loadBrands = async () => {
      const brandList = await fetchBrands();
      brandList.sort((a, b) => a.name.localeCompare(b.name));
      setBrands(brandList);
      setFilteredBrands(brandList);
    };

    loadBrands();
  }, []);

  useEffect(() => {
    const updateFilteredBrands = () => {
      let filtered = brands;

      if (searchTerm.trim() !== "") {
        filtered = brands.filter((brand) =>
          brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const uniqueFiltered = filtered.filter(
        (brand) => !selectedBrands.includes(brand)
      );

      const combined = [
        ...selectedBrands,
        ...uniqueFiltered,
      ];

      setFilteredBrands(combined);
    };

    updateFilteredBrands();
  }, [searchTerm, brands, selectedBrands]);

  const handleBrandSelection = (brand: Brand) => {
    const updatedSelection = selectedBrands.some(
      (selected) => selected.name === brand.name
    )
      ? selectedBrands.filter((selected) => selected.name !== brand.name)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedSelection);

    setFilters((prevParams) => {
      const newParams: FilterParams = { ...prevParams };
      if (updatedSelection.length > 0) {
        newParams.brands = updatedSelection.map((brand) => brand.name);
      } else {
        delete newParams.brands;
      }
      delete newParams.page;
      return newParams;
    });
  };

  useEffect(() => {
    if ((filters.brands ?? []).length > 0) {
      const selected = brands.filter((brand) =>
        filters.brands?.includes(brand.name)
      );
      setSelectedBrands(selected);

      const remainingBrands = brands.filter(
        (brand) => !filters.brands?.includes(brand.name)
      );

      setFilteredBrands([...selected, ...remainingBrands]);
    }
  }, [brands, filters.brands]);

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return <>{text}</>;

    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span key={index} className="bg-yellow-200">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div>
      <hr />
      <div className="my-8">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          Brands
        </h3>
        <div className="mt-3">
          <div className="flex items-center bg-gray-100 rounded-md px-5 w-full mx-auto my-5">
            <button>
              <FiSearch className="text-gray-700 w-3 h-3 mr-2" />
            </button>
            <input
              type="text"
              placeholder="Search for brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow outline-none text-gray-500 placeholder-gray-400 bg-gray-100 py-3 text-[12px]"
            />
          </div>
          {filteredBrands.slice(0, 10).map((brand) => (
            <div key={brand.name} className="flex items-center gap-2 py-1 ml-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-3 w-3 accent-yellow-500"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandSelection(brand)}
                />
                <span className="ml-2 text-sm">
                  {highlightText(brand.name, searchTerm)}
                </span>
              </label>
              <span className="bg-gray-100 text-[10px] font-bold text-gray-600 px-2 rounded-md">
                {brand.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBrand;
