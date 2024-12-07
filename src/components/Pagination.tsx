import React from "react";
import { useFilterContext } from "../contexts/FilterContext";
import { useSetSearchParams } from "../hooks/useSetSearchParams";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const { filters, setFilters } = useFilterContext();
  useSetSearchParams(filters);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setFilters({ ...filters, page });
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center my-20 items-center space-x-5">
      <button
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentPage === 1 ? "text-gray-400" : "text-black hover:bg-gray-100"
        }`}
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        <GrFormPrevious />
      </button>

      <div className="flex gap-1">
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`w-9 h-9 rounded flex items-center justify-center text-sm ${
              page === currentPage
                ? "bg-yellow-500 text-white font-semibold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={`flex items-center justify-center w-9 h-9 rounded ${
          currentPage === totalPages
            ? "text-gray-400"
            : "text-black hover:bg-gray-100"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default Pagination;
