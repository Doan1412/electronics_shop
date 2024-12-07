import http from "../utils/http";
import { Rating } from "../types/rating.type";

export const fetchRatings = async (): Promise<Rating[]> => {
  try {
    const response = await http.get("/rating");

    const ratingArray: Rating[] = Object.entries(response.data).map(
      ([rating, total]) => ({
        rating: Number(rating),
        total: total as number,
      })
    );

    return ratingArray;
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return [];
  }
};
