import api from "../axios";

const getAll = async (filters?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await api.get("/reviews", {
    params: {
      ...filters,
    },
  });
  return response.data;
};


export const reviewsApis = { getAll }