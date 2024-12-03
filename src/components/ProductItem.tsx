import React from "react";
import { Product } from "../types/product.type";

interface ProductItemProps {
  product: Product;
  query: string; // Thêm query làm prop
}

const ProductItem: React.FC<ProductItemProps> = ({ product, query }) => {
  // Hàm tô vàng các từ trùng với query
  const highlightQuery = (text: string) => {
    if (!query) return text;

    // Tạo regex để tìm từ khóa
    const regex = new RegExp(`(${query})`, "gi");

    // Tách văn bản và bọc từ khóa bằng thẻ <span>
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="rounded-md p-4 w-56">
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-contain mb-5"
      />

      {/* Category */}
      <h3 className="text-gray-500 text-xs font-semibold mb-2 uppercase">
        {product.categories && product.categories[0]}
      </h3>

      {/* Title */}
      <h2 className="text-sm font-semibold mb-1 h-6 line-clamp-1">
        {highlightQuery(product.name || "")}
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-xs mb-2 line-clamp-3 h-12">
        {highlightQuery(product.description || "")}
      </p>

      {/* Price and Rating */}
      <div className="flex items-center gap-2 mt-2">
        <div>
          <span className="text-yellow-600 font-extrabold text-[12px] pr-1">
            $
          </span>
          <span className="font-bold text-md">
            {product.price ? product.price.toFixed(2) : "0.00"}
          </span>
        </div>
        <div className="flex items-center space-x-1 border border-yellow-600 rounded px-1">
          {/* Một ngôi sao */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ca8a04"
            viewBox="0 0 24 24"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.907a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.97-2.907a1 1 0 00-1.176 0l-3.97 2.907c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.464 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z"
            />
          </svg>
          {/* Rating */}
          <span className="text-[10px] text-yellow-600 font-bold">
            {product.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
