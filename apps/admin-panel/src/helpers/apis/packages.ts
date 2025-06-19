import api from "../axios";

const getAll = async (filters?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await api.get("/packages/all", {
    params: {
      ...filters,
    },
  });
  return response.data;
};

const create = async (data: any) => {
  const response = await api.post("/packages/create", data);
  return response.data;
};

const getById = async (id: number) => {
  const response = await api.get("/packages/" + id);
  return response.data;
};

const remove = async (id: number) => {
  const response = await api.delete("/packages/" + id);
  return response.data;
};

export const packagesApis = {
  getAll,
  create,
  getById,
  remove,
};
