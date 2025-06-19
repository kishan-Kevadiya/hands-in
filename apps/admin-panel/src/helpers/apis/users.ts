import api from "../axios";

const getAll = async (filters?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await api.get("/users/get", {
    params: {
      ...filters,
    },
  });
  return response.data;
};

const getById = async (id: string) => {
  const response = await api.get("/users/" + id);
  return response.data;
};

const getCountByDate = async (filters?: {
  startDate: string;
  endDate: string;
}) => {
  const response = await api.get("/users/users-count-by-date", {
    params: {
      ...filters,
    },
  });
  return response.data;
};

export const usersApis = {
  getAll,
  getById,
  getCountByDate,
};
