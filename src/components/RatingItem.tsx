import React from "react";
import { Rating } from "../types/rating.type";

interface RatingItemProps {
  rating: Rating;
  isSelected: boolean;
  onClick: () => void;
}

const RatingItem: React.FC<RatingItemProps> = ({ rating, isSelected, onClick }) => {
  return (
    <div
      className={"flex items-center space-x-4 cursor-pointer"}
      onClick={onClick}
    >
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            fill={index < rating.rating ? "#e2a400" : "#E5E7EB"}
            className={`w-6 h-6 ${
              !isSelected ? "opacity-75" : ""
            }`}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.907a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.97-2.907a1 1 0 00-1.176 0l-3.97 2.907c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.464 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z"
            />
          </svg>
        ))}
      </div>
      <span className="text-gray-700 text-lg">{rating.total}</span>
    </div>
  );
};

export default RatingItem;
