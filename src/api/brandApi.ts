import http from "../utils/http";
import { Brand } from "../types/brand.type";

export const fetchBrands = async (): Promise<Brand[]> => {
  try {
    const response = await http.get("/brand");
    const brandArray: Brand[] = Object.entries(response.data).map(
      ([name, total]) => ({
        name,
        total: total as number,
      })
    );

    return brandArray;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};
