import api from "../axios";

const getAll = async (filters?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await api.get("/coupons/all", {
    params: {
      ...filters,
    },
  });
  return response.data;
};

const create = async (data: any) => {
  const response = await api.post("/coupons/create", data);
  return response.data;
};

const getById = async (id: number) => {
  const response = await api.get("/coupons/" + id);
  return response.data;
};

export const discountsApis = {
  getAll,
  create,
  getById,
};
