import React, { useState, useEffect } from "react";
import { Rating } from "../types/rating.type";
import { fetchRatings } from "../api/ratingApi";
import RatingItem from "./RatingItem";
import { useFilterContext } from "../contexts/FilterContext";

const FilterRating = () => {
  const { filters, setFilters } = useFilterContext();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    if (filters.ratings) {
      setSelectedRating(filters.ratings);
    }
  }, [filters]);

  useEffect(() => {
    const loadRatings = async () => {
      const ratingList = await fetchRatings();
      setRatings(ratingList.reverse());
    };

    loadRatings();
  }, []);

  const handleRatingClick = (rating: number) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters.page;

      if (prevFilters.ratings === rating) {
        delete newFilters.ratings;
      } else {
        newFilters.ratings = rating;
      }

      return newFilters;
    });
  };

  return (
    <div>
      <hr />
      <div className="my-8">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          Ratings
        </h3>
        <div className="mt-2">
          {ratings.map((rating) => (
            <RatingItem
              key={rating.rating}
              rating={rating}
              isSelected={selectedRating === rating.rating}
              onClick={() => handleRatingClick(rating.rating)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterRating;
